const { createClient } = require('@libsql/client');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// IMPORTANT: Add your Turso auth token here
const TURSO_URL = 'libsql://database-manish064.aws-ap-south-1.turso.io';
const TURSO_AUTH_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjU0MDQ4MDksImlkIjoiZmIyMTMwZTgtY2Q5OS00OGRkLWJlOWMtMDEwNzY3MDFhMWQ2IiwicmlkIjoiY2IyYjU1ZGMtOGE3Ni00ZTZlLWE0NzAtMzI3MGZjYjlhZDBjIn0.VkwYMqHtouKo1R6qpIqMC9DexesiYYmNobW8lUuz_HUONwTlCcfoHwyLIlHkLsip67tOaBkLf-9hd-r9kJzADw';

// Path to your local SQLite database
const LOCAL_DB_PATH = path.join(__dirname, 'database.sqlite');

async function migrateDatabaseToTurso() {
    console.log('🚀 Starting database migration to Turso...\n');

    // Connect to Turso
    const tursoClient = createClient({
        url: TURSO_URL,
        authToken: TURSO_AUTH_TOKEN,
    });

    // Connect to local SQLite
    const localDb = new sqlite3.Database(LOCAL_DB_PATH);

    try {
        // Get all table names from local database
        const tables = await new Promise((resolve, reject) => {
            localDb.all(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(r => r.name));
                }
            );
        });

        console.log(`📋 Found ${tables.length} tables to migrate: ${tables.join(', ')}\n`);

        for (const tableName of tables) {
            console.log(`📦 Migrating table: ${tableName}`);

            // Get table schema
            const schema = await new Promise((resolve, reject) => {
                localDb.all(
                    `SELECT sql FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows[0]?.sql);
                    }
                );
            });

            if (schema) {
                // Create table in Turso
                console.log(`  ✓ Creating table schema...`);
                await tursoClient.execute(schema);

                // Get all data from local table
                const rows = await new Promise((resolve, reject) => {
                    localDb.all(`SELECT * FROM ${tableName}`, (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });

                console.log(`  ✓ Found ${rows.length} rows to migrate`);

                // Insert data in batches
                if (rows.length > 0) {
                    const columns = Object.keys(rows[0]);
                    const placeholders = columns.map(() => '?').join(', ');

                    for (let i = 0; i < rows.length; i++) {
                        const row = rows[i];
                        const values = columns.map(col => row[col]);

                        await tursoClient.execute({
                            sql: `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
                            args: values
                        });

                        if ((i + 1) % 100 === 0) {
                            console.log(`  ↳ Migrated ${i + 1}/${rows.length} rows...`);
                        }
                    }

                    console.log(`  ✅ Completed migrating ${rows.length} rows\n`);
                } else {
                    console.log(`  ✓ Table is empty, skipping data migration\n`);
                }
            }
        }

        console.log('✨ Migration completed successfully!\n');
        console.log('Next steps:');
        console.log('1. Update server/.env.production with your Turso credentials');
        console.log('2. Test the connection locally');
        console.log('3. Deploy to Vercel');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        localDb.close();
    }
}

// Run migration
if (TURSO_AUTH_TOKEN === 'YOUR_TURSO_AUTH_TOKEN_HERE') {
    console.log('❌ Error: Please add your Turso auth token to this script first!');
    console.log('\nTo get your token, run in WSL:');
    console.log('  turso db tokens create database-manish064');
    console.log('\nOr get it from the Turso web console at: https://turso.tech/app');
    process.exit(1);
} else {
    migrateDatabaseToTurso()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error('Migration error:', err);
            process.exit(1);
        });
}
