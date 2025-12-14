// Test script to insert into WithdrawalRequests table directly
const { createClient } = require('@libsql/client');
require('dotenv').config();

async function testWithdrawalInsert() {
    console.log('🔗 Connecting to Turso database...');

    const turso = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    console.log('📋 Testing INSERT into WithdrawalRequests table...');

    try {
        // Test data
        const userId = 2; // A test user ID that exists
        const amount = 100;
        const status = 'pending';
        const bankDetails = JSON.stringify({
            accountHolderName: 'Test User',
            accountNumber: '1234567890',
            ifscCode: 'SBIN0001234',
            capturedAt: new Date().toISOString()
        });
        const requestDate = new Date().toISOString();
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

        console.log('Test data:', { userId, amount, status, bankDetails: bankDetails.substring(0, 50) + '...' });

        // Try INSERT
        const sql = `INSERT INTO "WithdrawalRequests" 
      ("userId", "amount", "status", "bankDetails", "requestDate", "createdAt", "updatedAt")
      VALUES (${userId}, ${amount}, '${status}', '${bankDetails.replace(/'/g, "''")}', '${requestDate}', '${createdAt}', '${updatedAt}')`;

        console.log('SQL Query:', sql);

        const result = await turso.execute(sql);
        console.log('✅ INSERT successful!');
        console.log('Result:', result);
        console.log('Last Insert ID:', result.lastInsertRowid);

        // Check if it was inserted
        const checkResult = await turso.execute(`SELECT * FROM "WithdrawalRequests" ORDER BY id DESC LIMIT 1`);
        console.log('Inserted row:', checkResult.rows[0]);

    } catch (error) {
        console.error('❌ INSERT failed!');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Full error:', error);
    }
}

testWithdrawalInsert();
