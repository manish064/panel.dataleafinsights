const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reward = sequelize.define('Reward', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('voucher', 'cash', 'gift_card', 'product'),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pointsCost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cashValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD'
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    termsAndConditions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expiryDays: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxRedemptionsPerUser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    minimumPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['type']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['pointsCost']
      },
      {
        fields: ['featured']
      }
    ]
  });

  return Reward;
};