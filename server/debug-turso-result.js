const { createClient } = require('@libsql/client');
require('dotenv').config();

const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function debug() {
    console.log('Testing raw Turso query...');
    const result = await turso.execute("SELECT * FROM Users LIMIT 1");
    console.log('Raw result keys:', Object.keys(result));
    console.log('Row format:', result.rows[0]);

    if (result.rows.length > 0) {
        const row = result.rows[0];
        console.log('Is row an array?', Array.isArray(row));
        console.log('Is row an object?', typeof row === 'object');
    } else {
        console.log('No users found in database');
    }
}

debug();
