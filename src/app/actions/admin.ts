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

        return { success: true, data: registrationsRes.rows };
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
        await client.query('DELETE FROM registrations WHERE id = $1', [id]);

        revalidatePath('/admin');
        return { success: true };
    } catch (e) {
        console.error('Delete registration error:', e);
        return { success: false, error: 'Failed to delete registration' };
    } finally {
        client.release();
    }
}

export async function getAdminStats() {
    try {
        const registrationsRes = await pool.query('SELECT COUNT(*) as total FROM registrations');
        const categoriesRes = await pool.query('SELECT category, COUNT(*) as count FROM registrations GROUP BY category');
        const inquiriesRes = await pool.query('SELECT COUNT(*) as total FROM contact_submissions');

        return {
            totalRegistrations: parseInt(registrationsRes.rows[0].total || '0'),
            totalInquiries: parseInt(inquiriesRes.rows[0].total || '0'),
            categories: categoriesRes.rows
        };
    } catch (e) {
        console.error('Stats error:', e);
        return {
            totalRegistrations: 0,
            totalInquiries: 0,
            categories: []
        };
    }
}
