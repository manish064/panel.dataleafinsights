const { sequelize } = require('./models');

async function addBankDetailsColumns() {
  try {
    console.log('Starting migration to add bank details columns...');
    
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Check if columns already exist
    const queryInterface = sequelize.getQueryInterface();
    const tableDescription = await queryInterface.describeTable('Users');
    
    console.log('Current Users table columns:', Object.keys(tableDescription));
    
    // Add accountHolderName column if it doesn't exist
    if (!tableDescription.accountHolderName) {
      console.log('Adding accountHolderName column...');
      await queryInterface.addColumn('Users', 'accountHolderName', {
        type: sequelize.Sequelize.DataTypes.STRING,
        allowNull: true
      });
      console.log('✅ accountHolderName column added');
    } else {
      console.log('✅ accountHolderName column already exists');
    }
    
    // Add accountNumber column if it doesn't exist
    if (!tableDescription.accountNumber) {
      console.log('Adding accountNumber column...');
      await queryInterface.addColumn('Users', 'accountNumber', {
        type: sequelize.Sequelize.DataTypes.STRING,
        allowNull: true
      });
      console.log('✅ accountNumber column added');
    } else {
      console.log('✅ accountNumber column already exists');
    }
    
    // Add ifscCode column if it doesn't exist
    if (!tableDescription.ifscCode) {
      console.log('Adding ifscCode column...');
      await queryInterface.addColumn('Users', 'ifscCode', {
        type: sequelize.Sequelize.DataTypes.STRING,
        allowNull: true
      });
      console.log('✅ ifscCode column added');
    } else {
      console.log('✅ ifscCode column already exists');
    }
    
    // Verify the columns were added
    const updatedTableDescription = await queryInterface.describeTable('Users');
    console.log('\nUpdated Users table columns:', Object.keys(updatedTableDescription));
    
    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  addBankDetailsColumns().catch(console.error);
}

module.exports = addBankDetailsColumns;