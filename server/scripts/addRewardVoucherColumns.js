process.env.DB_STORAGE = process.env.DB_STORAGE || require('path').join(__dirname, '..', 'database.sqlite');
const { sequelize } = require('../models');
const { Sequelize } = require('sequelize');

const run = async () => {
  const qi = sequelize.getQueryInterface();
  try {
    const table = await qi.describeTable('RewardVouchers');
    const ops = [];

    if (!table.rewardId) {
      ops.push(qi.addColumn('RewardVouchers', 'rewardId', { type: Sequelize.INTEGER, allowNull: true }));
    }
    if (!table.assignedToUserId) {
      ops.push(qi.addColumn('RewardVouchers', 'assignedToUserId', { type: Sequelize.INTEGER, allowNull: true }));
    }
    if (!table.assignedUserRewardId) {
      ops.push(qi.addColumn('RewardVouchers', 'assignedUserRewardId', { type: Sequelize.INTEGER, allowNull: true }));
    }

    if (ops.length === 0) {
      console.log('No columns to add. RewardVouchers already up to date.');
    } else {
      await Promise.all(ops);
      console.log(`Added ${ops.length} missing column(s) to RewardVouchers.`);
    }
  } catch (err) {
    console.error('Migration failed:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

run();
