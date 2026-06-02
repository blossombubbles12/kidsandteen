'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createRegistration(formData: {
    name: string;
    email: string;
    phone: string;
    category: string;
    guest_count: number;
    location: string;
}) {
    const client = await pool.connect();
    try {
        await client.query(
            `INSERT INTO registrations (name, email, phone, category, guest_count, location)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [formData.name, formData.email, formData.phone, formData.category, formData.guest_count, formData.location]
        );

        revalidatePath('/admin');
        return { success: true };
    } catch (e) {
        console.error('Registration error:', e);
        return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
        client.release();
    }
}
