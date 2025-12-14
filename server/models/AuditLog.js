const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AuditLog = sequelize.define('AuditLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Action must be between 1 and 100 characters'
        }
      }
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'Resource must be between 1 and 50 characters'
        }
      }
    },
    resourceId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Admins',
        key: 'id'
      }
    },
    adminEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIP: true
      }
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['GET', 'POST', 'PUT', 'PATCH', 'DELETE']]
      }
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 100,
        max: 599
      }
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'info',
      validate: {
        isIn: [['info', 'warning', 'error', 'critical']]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    oldValues: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('oldValues');
        if (!rawValue) return null;
        try {
          return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
        } catch (e) {
          return rawValue;
        }
      },
      set(value) {
        if (value && typeof value === 'object') {
          this.setDataValue('oldValues', JSON.stringify(value));
        } else {
          this.setDataValue('oldValues', value);
        }
      }
    },
    newValues: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('newValues');
        if (!rawValue) return null;
        try {
          return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
        } catch (e) {
          return rawValue;
        }
      },
      set(value) {
        if (value && typeof value === 'object') {
          this.setDataValue('newValues', JSON.stringify(value));
        } else {
          this.setDataValue('newValues', value);
        }
      }
    },
    metadata: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('metadata');
        if (!rawValue) return null;
        try {
          return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
        } catch (e) {
          return rawValue;
        }
      },
      set(value) {
        if (value && typeof value === 'object') {
          this.setDataValue('metadata', JSON.stringify(value));
        } else {
          this.setDataValue('metadata', value);
        }
      }
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Request duration in milliseconds'
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('tags');
        if (!rawValue) return [];
        try {
          return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
        } catch (e) {
          return [];
        }
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('tags', JSON.stringify(value));
        } else {
          this.setDataValue('tags', value || '[]');
        }
      }
    }
  }, {
    timestamps: true,
    updatedAt: false, // Audit logs should not be updated
    indexes: [
      {
        fields: ['action']
      },
      {
        fields: ['resource']
      },
      {
        fields: ['adminId']
      },
      {
        fields: ['userId']
      },
      {
        fields: ['level']
      },
      {
        fields: ['createdAt']
      },
      {
        fields: ['success']
      },
      {
        fields: ['ipAddress']
      },
      {
        fields: ['resource', 'action']
      },
      {
        fields: ['createdAt', 'level']
      }
    ]
  });

  // Class methods for creating audit logs
  AuditLog.logAdminAction = async function ({
    action,
    resource,
    resourceId = null,
    adminId = null,
    adminEmail = null,
    userId = null,
    userEmail = null,
    ipAddress = null,
    userAgent = null,
    method = null,
    endpoint = null,
    statusCode = null,
    level = 'info',
    description = null,
    oldValues = null,
    newValues = null,
    metadata = null,
    sessionId = null,
    duration = null,
    success = true,
    errorMessage = null,
    tags = []
  }) {
    try {
      return await this.create({
        action,
        resource,
        resourceId,
        adminId,
        adminEmail,
        userId,
        userEmail,
        ipAddress,
        userAgent,
        method,
        endpoint,
        statusCode,
        level,
        description,
        oldValues,
        newValues,
        metadata,
        sessionId,
        duration,
        success,
        errorMessage,
        tags
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      // Don't throw error to prevent breaking the main operation
      return null;
    }
  };

  AuditLog.logUserAction = async function ({
    action,
    resource,
    resourceId = null,
    userId,
    userEmail = null,
    ipAddress = null,
    userAgent = null,
    method = null,
    endpoint = null,
    statusCode = null,
    level = 'info',
    description = null,
    metadata = null,
    sessionId = null,
    duration = null,
    success = true,
    errorMessage = null,
    tags = []
  }) {
    try {
      return await this.create({
        action,
        resource,
        resourceId,
        userId,
        userEmail,
        ipAddress,
        userAgent,
        method,
        endpoint,
        statusCode,
        level,
        description,
        metadata,
        sessionId,
        duration,
        success,
        errorMessage,
        tags
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      return null;
    }
  };

  AuditLog.logSystemEvent = async function ({
    action,
    resource,
    resourceId = null,
    level = 'info',
    description = null,
    metadata = null,
    success = true,
    errorMessage = null,
    tags = []
  }) {
    try {
      return await this.create({
        action,
        resource,
        resourceId,
        level,
        description,
        metadata,
        success,
        errorMessage,
        tags
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      return null;
    }
  };

  // Query helpers
  AuditLog.getRecentActivity = async function (limit = 50) {
    return await this.findAll({
      limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: sequelize.models.Admin,
          as: 'admin',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: sequelize.models.User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });
  };

  AuditLog.getStatistics = async function (startDate = null, endDate = null) {
    const whereClause = {};

    if (startDate && endDate) {
      whereClause.createdAt = {
        [sequelize.Sequelize.Op.between]: [startDate, endDate]
      };
    }

    const [totalLogs, todayLogs, errorLogs, warningLogs] = await Promise.all([
      this.count({ where: whereClause }),
      this.count({
        where: {
          ...whereClause,
          createdAt: {
            [sequelize.Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0)
          }
        }
      }),
      this.count({
        where: {
          ...whereClause,
          level: 'error'
        }
      }),
      this.count({
        where: {
          ...whereClause,
          level: 'warning'
        }
      })
    ]);

    return {
      totalLogs,
      todayLogs,
      errorLogs,
      warningLogs
    };
  };

  return AuditLog;
};