'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!firstName || !lastName || !email || !subject || !message) {
        return { success: false, error: 'All fields are required' };
    }

    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO contact_submissions (first_name, last_name, email, subject, message) VALUES ($1, $2, $3, $4, $5)',
            [firstName, lastName, email, subject, message]
        );
        return { success: true };
    } catch (e) {
        console.error('Contact submission error:', e);
        return { success: false, error: 'Failed to submit message. Please try again.' };
    } finally {
        client.release();
    }
}

export async function getContactSubmissions() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
        return { success: true, data: res.rows };
    } catch (e) {
        console.error('Error fetching contact submissions:', e);
        return { success: false, error: 'Failed to load inquiries' };
    } finally {
        client.release();
    }
}

export async function deleteContactSubmission(id: number) {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM contact_submissions WHERE id = $1', [id]);
        revalidatePath('/admin');
        return { success: true };
    } catch (e) {
        console.error('Error deleting contact submission:', e);
        return { success: false, error: 'Failed to delete inquiry' };
    } finally {
        client.release();
    }
}
