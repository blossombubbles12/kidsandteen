require('dotenv').config({ path: '.env.local' });
const { Pool } = require('@neondatabase/serverless');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function main() {
  console.log("Connecting to database...");
  let client;
  try {
    client = await pool.connect();
    console.log("Connected!");

    // Drop old dogs table (no longer needed)
    await client.query(`DROP TABLE IF EXISTS dogs CASCADE`);

    // Recreate registrations table without pet columns
    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        category TEXT NOT NULL,
        guest_count INT NOT NULL DEFAULT 0,
        location TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Drop pet-related columns if they still exist
    await client.query(`ALTER TABLE registrations DROP COLUMN IF EXISTS pet_type`);
    await client.query(`ALTER TABLE registrations DROP COLUMN IF EXISTS pet_count`);
    await client.query(`ALTER TABLE registrations DROP COLUMN IF EXISTS pet_names`);
    await client.query(`ALTER TABLE registrations DROP COLUMN IF EXISTS is_vaccinated`);
    await client.query(`ALTER TABLE registrations DROP COLUMN IF EXISTS donation_interest`);
    await client.query(`ALTER TABLE registrations DROP COLUMN IF EXISTS sex`);

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create contact_submissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database schema updated successfully.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

main();
