const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserReward = sequelize.define('UserReward', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    rewardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rewards',
        key: 'id'
      }
    },
    pointsSpent: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'delivered', 'expired', 'cancelled'),
      defaultValue: 'pending'
    },
    redemptionCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    deliveryMethod: {
      type: DataTypes.ENUM('email', 'sms', 'postal', 'digital'),
      defaultValue: 'email'
    },
    deliveryAddress: {
      type: DataTypes.JSON,
      allowNull: true
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    voucherCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['rewardId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['redemptionCode']
      }
    ]
  });

  return UserReward;
};