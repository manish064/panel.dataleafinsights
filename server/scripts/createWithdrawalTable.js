const { createClient } = require('@libsql/client');
require('dotenv').config();

async function createWithdrawalRequestsTable() {
    console.log('🔗 Connecting to Turso database...');

    const turso = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    console.log('📋 Checking existing tables...');

    try {
        const tables = await turso.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;");
        console.log('Existing tables:', tables.rows.map(r => r.name));

        // Check if WithdrawalRequests table exists
        const hasWithdrawalRequests = tables.rows.some(r => r.name === 'WithdrawalRequests');

        if (hasWithdrawalRequests) {
            console.log('✅ WithdrawalRequests table already exists');

            // Show table schema
            const schema = await turso.execute("PRAGMA table_info(WithdrawalRequests);");
            console.log('Table columns:', schema.rows.map(r => `${r.name} (${r.type})`));
        } else {
            console.log('❌ WithdrawalRequests table does NOT exist. Creating...');

            // Create the table
            const createTableSQL = `
        CREATE TABLE IF NOT EXISTS "WithdrawalRequests" (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "userId" INTEGER NOT NULL REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
          "amount" INTEGER NOT NULL,
          "status" VARCHAR(255) DEFAULT 'pending',
          "bankDetails" TEXT NOT NULL,
          "requestDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
          "processedDate" DATETIME,
          "approvedAt" DATETIME,
          "approvedBy" INTEGER REFERENCES "Admins" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
          "rejectedAt" DATETIME,
          "rejectedBy" INTEGER REFERENCES "Admins" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
          "rejectionReason" TEXT,
          "completedAt" DATETIME,
          "transactionId" VARCHAR(255) UNIQUE,
          "notes" TEXT,
          "adminNotes" TEXT,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;

            await turso.execute(createTableSQL);
            console.log('✅ WithdrawalRequests table created successfully');

            // Create indexes
            console.log('Creating indexes...');
            try {
                await turso.execute('CREATE INDEX IF NOT EXISTS "withdrawal_requests_user_id" ON "WithdrawalRequests" ("userId");');
                await turso.execute('CREATE INDEX IF NOT EXISTS "withdrawal_requests_status" ON "WithdrawalRequests" ("status");');
                await turso.execute('CREATE INDEX IF NOT EXISTS "withdrawal_requests_request_date" ON "WithdrawalRequests" ("requestDate");');
                console.log('✅ Indexes created');
            } catch (indexError) {
                console.log('⚠️ Index creation warning:', indexError.message);
            }
        }

        console.log('✅ Done!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    }
}

createWithdrawalRequestsTable();
