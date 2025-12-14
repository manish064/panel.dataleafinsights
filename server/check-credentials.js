const { createClient } = require('@libsql/client');
require('dotenv').config();

const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function checkUsersAndAdmins() {
    console.log('🔍 Checking Users and Admins in Turso Database\n');

    try {
        // Check Users
        console.log('=== USERS ===');
        const users = await turso.execute('SELECT id, email, password, firstName, lastName, isActive FROM Users LIMIT 5');
        console.log(`Found ${users.rows.length} users:`);
        users.rows.forEach((user, i) => {
            console.log(`  ${i + 1}. Email: ${user.email}`);
            console.log(`     Name: ${user.firstName} ${user.lastName}`);
            console.log(`     Has Password: ${user.password ? 'Yes (hashed)' : 'No'}`);
            console.log(`     Active: ${user.isActive}`);
            console.log('');
        });

        // Check Admins
        console.log('\n=== ADMINS ===');
        const admins = await turso.execute('SELECT id, email, password, firstName, lastName, role, isActive FROM Admins LIMIT 5');
        console.log(`Found ${admins.rows.length} admins:`);
        admins.rows.forEach((admin, i) => {
            console.log(`  ${i + 1}. Email: ${admin.email}`);
            console.log(`     Name: ${admin.firstName} ${admin.lastName}`);
            console.log(`     Role: ${admin.role}`);
            console.log(`     Has Password: ${admin.password ? 'Yes (hashed)' : 'No'}`);
            console.log(`     Active: ${admin.isActive}`);
            console.log('');
        });

        // Check Surveys
        console.log('\n=== SURVEYS ===');
        const surveys = await turso.execute('SELECT id, title, isActive, isPublished FROM Surveys LIMIT 3');
        console.log(`Found ${surveys.rows.length} surveys (sample):`);
        surveys.rows.forEach((survey, i) => {
            console.log(`  ${i + 1}. ${survey.title} - Active: ${survey.isActive}, Published: ${survey.isPublished}`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkUsersAndAdmins();
