const { Sequelize, QueryTypes } = require('sequelize');
const { createClient } = require('@libsql/client');
require('dotenv').config();

console.log('🔗 Configuring Turso database connection...');

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error('❌ Error: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required');
  process.exit(1);
}

// Initialize Turso HTTP client
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize Sequelize with dummy storage to satisfy checks
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  dialectOptions: {
    // This effectively disables the default driver behavior
    mode: 0x00010000 // SQLITE_OPEN_MEMORY
  }
});

// Helper function to convert Turso row to plain object with proper types
function convertRow(row) {
  if (!row) return null;
  const obj = {};
  for (const [key, value] of Object.entries(row)) {
    // Convert BigInt to Number for compatibility
    if (typeof value === 'bigint') {
      obj[key] = Number(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// OVERRIDE the query method to use Turso client instead of sqlite3
const originalQuery = sequelize.query;
sequelize.query = async function (sql, options = {}) {
  // If options object is passed with logging disabled, respect it
  const shouldLog = sequelize.options.logging && !(options && options.logging === false);

  try {
    const queryStr = typeof sql === 'string' ? sql : sql.query;

    if (shouldLog) {
      console.log(`Executing (Turso): ${queryStr}`);
    }

    // Execute query via Turso client
    const result = await turso.execute(queryStr);

    // Convert all rows to plain objects with proper types
    const convertedRows = (result.rows || []).map(convertRow);

    // Format result to match what Sequelize expects from sqlite3
    const response = {
      rows: convertedRows,
      count: convertedRows.length,
      lastID: result.lastInsertRowid ? Number(result.lastInsertRowid) : 0,
      changes: result.rowsAffected || 0
    };

    // Handle different query types and options
    if (options) {
      const queryType = options.type || (queryStr.trim().toUpperCase().startsWith('SELECT') ? QueryTypes.SELECT : null);

      // Handle UPDATE queries - return metadata with changes count
      if (queryType === QueryTypes.UPDATE || queryStr.trim().toUpperCase().startsWith('UPDATE')) {
        return [undefined, response.changes || result.rowsAffected || 0];
      }

      // Handle INSERT queries - return lastInsertRowid
      if (queryType === QueryTypes.INSERT || queryStr.trim().toUpperCase().startsWith('INSERT')) {
        return [response.lastID, response];
      }

      // Handle DELETE queries
      if (queryType === QueryTypes.DELETE || queryStr.trim().toUpperCase().startsWith('DELETE')) {
        return [undefined, response.changes || result.rowsAffected || 0];
      }

      // If plain is true (used by findOne), return the first row or null
      if (options.plain) {
        const row = convertedRows.length > 0 ? convertedRows[0] : null;
        // Build model instance if model is provided
        if (row && options.model) {
          const instance = options.model.build(row, { isNewRecord: false, raw: true });
          instance._previousDataValues = { ...row };
          instance.dataValues = { ...row };
          return instance;
        }
        return row;
      }

      // For standard SELECT queries, return the rows array
      if (queryType === QueryTypes.SELECT || options.type === 'SELECT') {
        // Build model instances if model is provided
        if (options.model) {
          const instances = convertedRows.map(row => {
            const instance = options.model.build(row, { isNewRecord: false, raw: true });
            instance._previousDataValues = { ...row };
            instance.dataValues = { ...row };
            return instance;
          });
          return instances;
        }
        return convertedRows;
      }

      // Handle RAW queries
      if (options.type === QueryTypes.RAW || options.raw) {
        return [convertedRows, response];
      }
    }

    // Default: return [results, metadata] format
    return [convertedRows, response];

  } catch (error) {
    // Gracefully handle "index already exists" errors
    if (error.message && error.message.includes('index') && error.message.includes('already exists')) {
      console.log(`⚠️  Warning: Index already exists, skipping creation. (${error.message})`);
      return [[], { rows: [], count: 0, changes: 0 }];
    }

    // Handle "table already exists" errors during sync
    if (error.message && error.message.includes('table') && error.message.includes('already exists')) {
      console.log(`⚠️  Warning: Table already exists, skipping creation. (${error.message})`);
      return [[], { rows: [], count: 0, changes: 0 }];
    }

    console.error('❌ Turso Query Error:', error.message);
    console.error('   Query:', typeof sql === 'string' ? sql : sql.query);
    throw error;
  }
};

console.log('✅ Turso custom provider configured');

// Import models
const User = require('./User')(sequelize);
const Survey = require('./Survey')(sequelize);
const SurveyResponse = require('./SurveyResponse')(sequelize);
const Reward = require('./Reward')(sequelize);
const UserReward = require('./UserReward')(sequelize);
const RewardVoucher = require('./RewardVoucher')(sequelize);
const WithdrawalRequest = require('./WithdrawalRequest')(sequelize);
const Admin = require('./Admin')(sequelize);
const AuditLog = require('./AuditLog')(sequelize);

// Define associations
User.hasMany(SurveyResponse, { foreignKey: 'userId' });
SurveyResponse.belongsTo(User, { foreignKey: 'userId' });

Survey.hasMany(SurveyResponse, { foreignKey: 'surveyId' });
SurveyResponse.belongsTo(Survey, { foreignKey: 'surveyId' });

User.hasMany(UserReward, { foreignKey: 'userId' });
UserReward.belongsTo(User, { foreignKey: 'userId' });

Reward.hasMany(UserReward, { foreignKey: 'rewardId' });
UserReward.belongsTo(Reward, { foreignKey: 'rewardId' });

// Reward vouchers associations
Reward.hasMany(RewardVoucher, { foreignKey: 'rewardId', as: 'vouchers' });
RewardVoucher.belongsTo(Reward, { foreignKey: 'rewardId', as: 'reward' });
User.hasMany(RewardVoucher, { foreignKey: 'assignedToUserId', as: 'assignedVouchers' });
RewardVoucher.belongsTo(User, { foreignKey: 'assignedToUserId', as: 'assignedToUser' });
UserReward.hasOne(RewardVoucher, { foreignKey: 'assignedUserRewardId', as: 'voucher' });
RewardVoucher.belongsTo(UserReward, { foreignKey: 'assignedUserRewardId', as: 'userReward' });

User.hasMany(WithdrawalRequest, { foreignKey: 'userId' });
WithdrawalRequest.belongsTo(User, { foreignKey: 'userId' });

// Admin associations for withdrawal requests
WithdrawalRequest.belongsTo(Admin, { foreignKey: 'approvedBy', as: 'ApprovedByAdmin' });
WithdrawalRequest.belongsTo(Admin, { foreignKey: 'rejectedBy', as: 'RejectedByAdmin' });
Admin.hasMany(WithdrawalRequest, { foreignKey: 'approvedBy', as: 'ApprovedWithdrawals' });
Admin.hasMany(WithdrawalRequest, { foreignKey: 'rejectedBy', as: 'RejectedWithdrawals' });

// Admin associations
Admin.hasMany(AuditLog, { foreignKey: 'adminId', as: 'auditLogs' });
AuditLog.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' });

Admin.belongsTo(Admin, { foreignKey: 'createdBy', as: 'creator' });
Admin.hasMany(Admin, { foreignKey: 'createdBy', as: 'createdAdmins' });

// AuditLog associations
AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(AuditLog, { foreignKey: 'userId', as: 'auditLogs' });

module.exports = {
  sequelize,
  turso, // Export turso client for direct access if needed
  User,
  Survey,
  SurveyResponse,
  Reward,
  UserReward,
  RewardVoucher,
  WithdrawalRequest,
  Admin,
  AuditLog
};
