const { sequelize, Admin } = require('../models');
const bcrypt = require('bcryptjs');

async function createSuperAdmin() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Check if super admin already exists
    const existingAdmin = await Admin.findOne({
      where: {
        email: 'admin@credencuesta-panel.com'
      }
    });

    if (existingAdmin) {
      console.log('Super Admin already exists with email: admin@credencuesta-panel.com');
      console.log('Admin ID:', existingAdmin.id);
      console.log('Role:', existingAdmin.role);
      return;
    }

    // Create super admin with full permissions
    const superAdminData = {
      email: 'admin@credencuesta-panel.com',
      password: 'AdminPanel2024!',
      firstName: 'Super',
      lastName: 'Admin',
      role: 'super_admin',
      permissions: {
        users: ['read', 'create', 'update', 'delete'],
        surveys: ['read', 'create', 'update', 'delete'],
        rewards: ['read', 'create', 'update', 'delete'],
        withdrawals: ['read', 'create', 'update', 'delete'],
        analytics: ['read', 'create', 'update', 'delete'],
        settings: ['read', 'create', 'update', 'delete'],
        audit_logs: ['read', 'create', 'update', 'delete'],
        admins: ['read', 'create', 'update', 'delete']
      },
      isActive: true,
      department: 'Administration',
      notes: 'Default Super Administrator account created during system setup'
    };

    const superAdmin = await Admin.create(superAdminData);
    
    console.log('✅ Super Admin created successfully!');
    console.log('📧 Email: admin@credencuesta-panel.com');
    console.log('🔑 Password: AdminPanel2024!');
    console.log('👤 Name: Super Admin');
    console.log('🛡️ Role: super_admin');
    console.log('🆔 Admin ID:', superAdmin.id);
    console.log('');
    console.log('⚠️  IMPORTANT SECURITY NOTICE:');
    console.log('Please change the default password after first login!');
    console.log('The admin panel is accessible at: https://admin.credencuesta-panel.com');
    
  } catch (error) {
    console.error('❌ Error creating Super Admin:', error.message);
    if (error.name === 'SequelizeValidationError') {
      error.errors.forEach(err => {
        console.error(`- ${err.path}: ${err.message}`);
      });
    }
  } finally {
    await sequelize.close();
  }
}

// Run the script
if (require.main === module) {
  createSuperAdmin();
}

module.exports = createSuperAdmin;