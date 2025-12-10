// Ensure we point to the correct SQLite file regardless of CWD
process.env.DB_STORAGE = process.env.DB_STORAGE || require('path').join(__dirname, '..', 'database.sqlite');

const { sequelize, Reward, RewardVoucher, UserReward, WithdrawalRequest } = require('../models');

async function clearRewardsAndPayments() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Counts before
    const before = {
      rewards: await Reward.count(),
      vouchers: await RewardVoucher.count(),
      userRewards: await UserReward.count(),
      withdrawals: await WithdrawalRequest.count(),
    };
    console.log('📊 Current totals before purge:', before);

    // Delete children first to avoid FK constraint issues
    const deleted = {};
    deleted.vouchers = await RewardVoucher.destroy({ where: {}, force: true });
    deleted.userRewards = await UserReward.destroy({ where: {}, force: true });
    deleted.withdrawals = await WithdrawalRequest.destroy({ where: {}, force: true });
    deleted.rewards = await Reward.destroy({ where: {}, force: true });

    console.log('🗑️ Rows deleted:', deleted);

    // Counts after
    const after = {
      rewards: await Reward.count(),
      vouchers: await RewardVoucher.count(),
      userRewards: await UserReward.count(),
      withdrawals: await WithdrawalRequest.count(),
    };
    console.log('✅ Purge complete. Totals after purge:', after);

    console.log('\nYou can now add fresh rewards and vouchers via the Admin panel.');
  } catch (err) {
    console.error('❌ Purge failed:', err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  clearRewardsAndPayments();
}

module.exports = clearRewardsAndPayments;

