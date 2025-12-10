const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RewardVoucher = sequelize.define('RewardVoucher', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    rewardId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('available', 'assigned', 'consumed', 'expired'),
      allowNull: false,
      defaultValue: 'available'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    assignedToUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    assignedUserRewardId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'RewardVouchers'
  });

  RewardVoucher.associate = (models) => {
    RewardVoucher.belongsTo(models.Reward, { foreignKey: 'rewardId', as: 'reward' });
    RewardVoucher.belongsTo(models.User, { foreignKey: 'assignedToUserId', as: 'assignedToUser' });
    RewardVoucher.belongsTo(models.UserReward, { foreignKey: 'assignedUserRewardId', as: 'userReward' });
  };

  return RewardVoucher;
};
