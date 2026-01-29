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
        pet_type TEXT,
        pet_count INT,
        pet_names TEXT,
        is_vaccinated TEXT,
        location TEXT,
        donation_interest TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

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

    // Create dogs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS dogs (
        id SERIAL PRIMARY KEY,
        registration_id INT REFERENCES registrations(id) ON DELETE CASCADE,
        name TEXT,
        breed TEXT,
        type TEXT
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

    // Ensure new columns exist if table was already created
    const addCols = [
      "ALTER TABLE registrations ADD COLUMN IF NOT EXISTS pet_type TEXT",
      "ALTER TABLE registrations ADD COLUMN IF NOT EXISTS pet_count INT",
      "ALTER TABLE registrations ADD COLUMN IF NOT EXISTS pet_names TEXT",
      "ALTER TABLE registrations ADD COLUMN IF NOT EXISTS is_vaccinated TEXT",
      "ALTER TABLE registrations ADD COLUMN IF NOT EXISTS location TEXT",
      "ALTER TABLE registrations ADD COLUMN IF NOT EXISTS donation_interest TEXT",
      "ALTER TABLE registrations ADD COLUMN IF NOT EXISTS sex TEXT",
      "ALTER TABLE dogs ADD COLUMN IF NOT EXISTS type TEXT"
    ];

    for (const sql of addCols) {
      await client.query(sql);
    }

    console.log("registrations and dogs tables updated with new fields");

  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

main();
