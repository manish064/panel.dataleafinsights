const { createClient } = require('@libsql/client');
require('dotenv').config();

async function createAuditLogsTable() {
    console.log('🔗 Connecting to Turso database...');

    const turso = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    console.log('📋 Checking existing tables...');

    try {
        const tables = await turso.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;");
        console.log('Existing tables:', tables.rows.map(r => r.name));

        // Check if AuditLogs table exists
        const hasAuditLogs = tables.rows.some(r => r.name === 'AuditLogs');

        if (hasAuditLogs) {
            console.log('✅ AuditLogs table already exists');

            // Show table schema
            const schema = await turso.execute("PRAGMA table_info(AuditLogs);");
            console.log('Table columns:', schema.rows.map(r => `${r.name} (${r.type})`));
        } else {
            console.log('❌ AuditLogs table does NOT exist. Creating...');

            // Create the table with STRING types instead of ENUM
            const createTableSQL = `
        CREATE TABLE IF NOT EXISTS "AuditLogs" (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "action" VARCHAR(255) NOT NULL,
          "resource" VARCHAR(255) NOT NULL,
          "resourceId" VARCHAR(255),
          "adminId" INTEGER REFERENCES "Admins" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
          "adminEmail" VARCHAR(255),
          "userId" INTEGER REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
          "userEmail" VARCHAR(255),
          "ipAddress" VARCHAR(255),
          "userAgent" TEXT,
          "method" VARCHAR(255),
          "endpoint" VARCHAR(255),
          "statusCode" INTEGER,
          "level" VARCHAR(255) NOT NULL DEFAULT 'info',
          "description" TEXT,
          "oldValues" TEXT,
          "newValues" TEXT,
          "metadata" TEXT,
          "sessionId" VARCHAR(255),
          "duration" INTEGER,
          "success" INTEGER NOT NULL DEFAULT 1,
          "errorMessage" TEXT,
          "tags" TEXT DEFAULT '[]',
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;

            await turso.execute(createTableSQL);
            console.log('✅ AuditLogs table created successfully');

            // Create indexes
            console.log('Creating indexes...');
            try {
                await turso.execute('CREATE INDEX IF NOT EXISTS "audit_logs_action" ON "AuditLogs" ("action");');
                await turso.execute('CREATE INDEX IF NOT EXISTS "audit_logs_resource" ON "AuditLogs" ("resource");');
                await turso.execute('CREATE INDEX IF NOT EXISTS "audit_logs_admin_id" ON "AuditLogs" ("adminId");');
                await turso.execute('CREATE INDEX IF NOT EXISTS "audit_logs_user_id" ON "AuditLogs" ("userId");');
                await turso.execute('CREATE INDEX IF NOT EXISTS "audit_logs_level" ON "AuditLogs" ("level");');
                await turso.execute('CREATE INDEX IF NOT EXISTS "audit_logs_created_at" ON "AuditLogs" ("createdAt");');
                console.log('✅ Indexes created');
            } catch (indexError) {
                console.log('⚠️ Index creation warning:', indexError.message);
            }
        }

        // Also check Rewards table
        const hasRewards = tables.rows.some(r => r.name === 'Rewards');
        if (hasRewards) {
            console.log('✅ Rewards table exists');
            const schema = await turso.execute("PRAGMA table_info(Rewards);");
            console.log('Rewards columns:', schema.rows.map(r => `${r.name} (${r.type})`));
        } else {
            console.log('❌ Rewards table does NOT exist');
        }

        console.log('✅ Done!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    }
}

createAuditLogsTable();
