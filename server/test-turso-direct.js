const sqlite3 = require('@libsql/sqlite3');
require('dotenv').config();

const url = process.env.TURSO_DATABASE_URL; // Should be libsql://...
const token = process.env.TURSO_AUTH_TOKEN;

console.log('Testing Turso connection...');
console.log('URL:', url);

try {
    // Test 1: Passing URL and Auth Token directly if supported
    // The README for some wrappers says filename can be the URL
    const filename = `${url}?authToken=${token}`;
    console.log('Attempting connection with string:', filename);

    const db = new sqlite3.Database(filename);

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS test_turso (id INT)");
        console.log('Created table (or it exists)');

        const stmt = db.prepare("INSERT INTO test_turso VALUES (?)");
        stmt.run(Date.now());
        stmt.finalize();
        console.log('Inserted data');

        db.each("SELECT rowid AS id, id AS val FROM test_turso LIMIT 1", (err, row) => {
            if (err) {
                console.error('Select error:', err);
            } else {
                console.log('Read data:', row.id + ": " + row.val);
            }
        });
    });

    db.close();
    console.log('Connection closed');

} catch (err) {
    console.error('Connection failed:', err);
}
