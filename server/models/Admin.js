const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: 'Password must be between 8 and 255 characters'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'First name must be between 1 and 50 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'Last name must be between 1 and 50 characters'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('super_admin', 'admin', 'moderator'),
      allowNull: false,
      defaultValue: 'admin'
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        users: ['read', 'update'],
        surveys: ['read', 'create', 'update', 'delete'],
        rewards: ['read', 'create', 'update', 'delete'],
        withdrawals: ['read', 'update'],
        analytics: ['read'],
        settings: ['read'],
        audit_logs: ['read']
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lockUntil: {
      type: DataTypes.DATE,
      allowNull: true
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[+]?[1-9]\d{1,14}$/
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Admins',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: async (admin) => {
        if (admin.password) {
          const salt = await bcrypt.genSalt(12);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },
      beforeUpdate: async (admin) => {
        if (admin.changed('password')) {
          const salt = await bcrypt.genSalt(12);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['role']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['createdAt']
      }
    ]
  });

  // Instance methods
  Admin.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  Admin.prototype.isLocked = function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
  };

  Admin.prototype.incLoginAttempts = async function() {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
      return this.update({
        loginAttempts: 1,
        lockUntil: null
      });
    }
    
    const updates = { loginAttempts: this.loginAttempts + 1 };
    
    // Lock account after 5 failed attempts for 2 hours
    if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
      updates.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    }
    
    return this.update(updates);
  };

  Admin.prototype.resetLoginAttempts = async function() {
    return this.update({
      loginAttempts: 0,
      lockUntil: null,
      lastLogin: new Date()
    });
  };

  Admin.prototype.hasPermission = function(resource, action) {
    if (this.role === 'super_admin') {
      return true;
    }
    
    if (!this.permissions || !this.permissions[resource]) {
      return false;
    }
    
    return this.permissions[resource].includes(action);
  };

  Admin.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  };

  Admin.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.twoFactorSecret;
    delete values.passwordResetToken;
    return values;
  };

  // Class methods
  Admin.getRoleHierarchy = function() {
    return {
      super_admin: 3,
      admin: 2,
      moderator: 1
    };
  };

  Admin.getDefaultPermissions = function(role) {
    const permissions = {
      super_admin: {
        users: ['read', 'create', 'update', 'delete'],
        surveys: ['read', 'create', 'update', 'delete'],
        rewards: ['read', 'create', 'update', 'delete'],
        withdrawals: ['read', 'create', 'update', 'delete'],
        analytics: ['read'],
        settings: ['read', 'update'],
        audit_logs: ['read'],
        admins: ['read', 'create', 'update', 'delete']
      },
      admin: {
        users: ['read', 'update'],
        surveys: ['read', 'create', 'update', 'delete'],
        rewards: ['read', 'create', 'update', 'delete'],
        withdrawals: ['read', 'update'],
        analytics: ['read'],
        settings: ['read'],
        audit_logs: ['read']
      },
      moderator: {
        users: ['read'],
        surveys: ['read', 'update'],
        rewards: ['read'],
        withdrawals: ['read'],
        analytics: ['read'],
        settings: [],
        audit_logs: []
      }
    };
    
    return permissions[role] || permissions.moderator;
  };

  return Admin;
};