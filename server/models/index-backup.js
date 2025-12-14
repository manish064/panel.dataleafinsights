const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration - Simplified for Turso
console.log('🔧 Configuring database connection...');

// For local development and Vercel, we'll use the Turso HTTP endpoint
// which works better with Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: require('better-sqlite3'),
    storage: ':memory:', // We don't actually use this
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
});

console.log('✅ Database configuration loaded');

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
