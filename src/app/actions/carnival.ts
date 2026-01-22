'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function registerUser(formData: any) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { name, email, phone, category, guestCount, dogs } = formData;

        // Insert registration
        const res = await client.query(
            `INSERT INTO registrations (name, email, phone, category, guest_count) 
             VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [name, email, phone, category, guestCount]
        );

        const registrationId = res.rows[0].id;

        // Insert dogs
        for (const dog of dogs) {
            await client.query(
                `INSERT INTO dogs (registration_id, name, breed) VALUES ($1, $2, $3)`,
                [registrationId, dog.name, dog.breed]
            );
        }

        await client.query('COMMIT');

        revalidatePath('/carnival');
        return { success: true };
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Registration error:', e);
        return { success: false, error: 'Registration failed' };
    } finally {
        client.release();
    }
}

export async function getStats() {
    try {
        // Count attendees (sum of guest_count + 1 for the registrant)
        const regRes = await pool.query('SELECT SUM(guest_count + 1) as attendees FROM registrations');
        const attendees = parseInt(regRes.rows[0].attendees || '0');

        // Count dogs
        const dogsRes = await pool.query('SELECT COUNT(*) as dogs FROM dogs');
        const dogs = parseInt(dogsRes.rows[0].dogs || '0');

        return { attendees, dogs };
    } catch (e) {
        console.error('Stats error:', e);
        return { attendees: 0, dogs: 0 };
    }
}
