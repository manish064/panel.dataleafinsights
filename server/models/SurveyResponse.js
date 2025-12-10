const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SurveyResponse = sequelize.define('SurveyResponse', {
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
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Surveys',
        key: 'id'
      }
    },
    responses: {
      type: DataTypes.JSON,
      allowNull: false
    },
    timeSpent: {
      type: DataTypes.INTEGER, // in seconds
      allowNull: true
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pointsEarned: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deviceInfo: {
      type: DataTypes.JSON,
      allowNull: true
    },
    qualityScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 10
      }
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['surveyId']
      },
      {
        fields: ['isCompleted']
      },
      {
        unique: true,
        fields: ['userId', 'surveyId']
      }
    ]
  });

  return SurveyResponse;
};