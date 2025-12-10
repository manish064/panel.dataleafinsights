const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Survey = sequelize.define('Survey', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pointsReward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    estimatedTime: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: false,
      defaultValue: 5
    },
    targetAudience: {
      type: DataTypes.JSON,
      allowNull: true
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    maxResponses: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    currentResponses: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['startDate', 'endDate']
      }
    ]
  });

  return Survey;
};