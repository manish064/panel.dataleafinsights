const { createClient } = require('@libsql/client');
require('dotenv').config();

const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function testConnection() {
    console.log('🔗 Testing Turso Connection...');
    console.log('📌 URL:', process.env.TURSO_DATABASE_URL);
    console.log('');

    try {
        // Test 1: Check connection with a simple query
        console.log('--- Test 1: Basic Connection ---');
        const result = await turso.execute('SELECT 1 as test');
        console.log('✅ Connection successful!');
        console.log('   Result:', result.rows);
        console.log('');

        // Test 2: List all tables
        console.log('--- Test 2: List Tables ---');
        const tables = await turso.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        );
        console.log('📋 Tables in database:');
        tables.rows.forEach((row, index) => {
            console.log(`   ${index + 1}. ${row.name}`);
        });
        console.log('');

        // Test 3: Check Users table (if exists)
        console.log('--- Test 3: Read Users Table ---');
        try {
            const users = await turso.execute('SELECT COUNT(*) as count FROM Users');
            console.log(`✅ Users table exists with ${users.rows[0].count} records`);

            // Show sample user (if any)
            const sampleUser = await turso.execute('SELECT id, email, firstName, lastName, createdAt FROM Users LIMIT 3');
            if (sampleUser.rows.length > 0) {
                console.log('📋 Sample users:');
                sampleUser.rows.forEach((user, index) => {
                    console.log(`   ${index + 1}. ${user.email} (${user.firstName} ${user.lastName})`);
                });
            }
        } catch (err) {
            console.log('❌ Users table error:', err.message);
        }
        console.log('');

        // Test 4: Check Surveys table (if exists)
        console.log('--- Test 4: Read Surveys Table ---');
        try {
            const surveys = await turso.execute('SELECT COUNT(*) as count FROM Surveys');
            console.log(`✅ Surveys table exists with ${surveys.rows[0].count} records`);

            // Show sample survey (if any)
            const sampleSurvey = await turso.execute('SELECT id, title, category, pointsReward FROM Surveys LIMIT 3');
            if (sampleSurvey.rows.length > 0) {
                console.log('📋 Sample surveys:');
                sampleSurvey.rows.forEach((survey, index) => {
                    console.log(`   ${index + 1}. ${survey.title} (${survey.pointsReward} points)`);
                });
            }
        } catch (err) {
            console.log('❌ Surveys table error:', err.message);
        }
        console.log('');

        // Test 5: Check Admins table (if exists)
        console.log('--- Test 5: Read Admins Table ---');
        try {
            const admins = await turso.execute('SELECT COUNT(*) as count FROM Admins');
            console.log(`✅ Admins table exists with ${admins.rows[0].count} records`);
        } catch (err) {
            console.log('❌ Admins table error:', err.message);
        }
        console.log('');

        console.log('🎉 All tests completed!');

    } catch (error) {
        console.error('❌ Connection failed:', error.message);
    }
}

testConnection();
