require('dotenv').config({ path: '.env.local' });
const { Pool } = require('@neondatabase/serverless');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
});

async function main() {
  console.log("Attempting to connect to database...");
  let client;
  try {
    client = await pool.connect();
    console.log("Connected to database!");

    // Create registrations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        category TEXT NOT NULL,
        guest_count INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("registrations table created/verified");

    // Create dogs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS dogs (
        id SERIAL PRIMARY KEY,
        registration_id INT REFERENCES registrations(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        breed TEXT NOT NULL
      );
    `);
    console.log("dogs table created/verified");

  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

main();
