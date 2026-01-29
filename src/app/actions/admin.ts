'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getAllRegistrations() {
    const client = await pool.connect();
    try {
        const registrationsRes = await client.query(`
            SELECT * FROM registrations 
            ORDER BY created_at DESC
        `);

        const registrations = registrationsRes.rows;

        // Fetch pets for each registration
        const registrationsWithPets = await Promise.all(registrations.map(async (reg: any) => {
            const petsRes = await client.query(`
                SELECT * FROM dogs 
                WHERE registration_id = $1
            `, [reg.id]);
            return {
                ...reg,
                pets: petsRes.rows
            };
        }));

        return { success: true, data: registrationsWithPets };
    } catch (e) {
        console.error('Fetch registrations error:', e);
        return { success: false, error: 'Failed to fetch registrations' };
    } finally {
        client.release();
    }
}

export async function deleteRegistration(id: number) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM dogs WHERE registration_id = $1', [id]);
        await client.query('DELETE FROM registrations WHERE id = $1', [id]);
        await client.query('COMMIT');

        revalidatePath('/admin');
        return { success: true };
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Delete registration error:', e);
        return { success: false, error: 'Failed to delete registration' };
    } finally {
        client.release();
    }
}

export async function getAdminStats() {
    try {
        const registrationsRes = await pool.query('SELECT COUNT(*) as total FROM registrations');
        const attendeesRes = await pool.query('SELECT SUM(guest_count + 1) as total FROM registrations');
        const petsRes = await pool.query('SELECT COUNT(*) as total FROM dogs');
        const categoriesRes = await pool.query('SELECT category, COUNT(*) as count FROM registrations GROUP BY category');
        const inquiriesRes = await pool.query('SELECT COUNT(*) as total FROM contact_submissions');

        return {
            totalRegistrations: parseInt(registrationsRes.rows[0].total || '0'),
            totalHumans: parseInt(attendeesRes.rows[0].total || '0'),
            totalPets: parseInt(petsRes.rows[0].total || '0'),
            totalInquiries: parseInt(inquiriesRes.rows[0].total || '0'),
            categories: categoriesRes.rows
        };
    } catch (e) {
        console.error('Stats error:', e);
        return {
            totalRegistrations: 0,
            totalHumans: 0,
            totalPets: 0,
            totalInquiries: 0,
            categories: []
        };
    }
}
