const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const WithdrawalRequest = sequelize.define('WithdrawalRequest', {
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 100 // Minimum withdrawal amount
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'approved', 'rejected', 'processed']]
      }
    },
    bankDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Snapshot of bank details at time of request (JSON string)',
      get() {
        const rawValue = this.getDataValue('bankDetails');
        if (!rawValue) return null;
        try {
          return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
        } catch (e) {
          return rawValue;
        }
      },
      set(value) {
        if (typeof value === 'object') {
          this.setDataValue('bankDetails', JSON.stringify(value));
        } else {
          this.setDataValue('bankDetails', value);
        }
      }
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    processedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Admins',
        key: 'id'
      }
    },
    rejectedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rejectedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Admins',
        key: 'id'
      }
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adminNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['requestDate']
      },
      {
        fields: ['transactionId']
      }
    ]
  });

  return WithdrawalRequest;
};