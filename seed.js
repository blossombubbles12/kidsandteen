const { Pool } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function seed() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const client = await pool.connect();

    try {
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

        // Create registrations table (no pet columns)
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

        // Seed admin user
        const password = await bcrypt.hash('admin123', 10);
        await client.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (email) DO UPDATE SET password = $3, role = $4`,
            ['Admin', 'admin@ktuafrica.org', password, 'admin']
        );

        console.log('Tables created and admin seeded successfully.');
        console.log('Admin login: admin@ktuafrica.org / admin123');
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
