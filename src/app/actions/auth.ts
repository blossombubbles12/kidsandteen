'use server'

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-at-least-32-chars-long';
const key = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function login(formData: any) {
    const { email, password } = formData;
    const client = await pool.connect();

    try {
        const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = res.rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            const session = await encrypt({ id: user.id, email: user.email, role: user.role, name: user.name });

            const cookieStore = await cookies();
            cookieStore.set('session', session, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 7200 // 2 hours
            });

            return { success: true, role: user.role };
        }

        return { success: false, error: 'Invalid email or password' };
    } catch (e) {
        console.error('Login error:', e);
        return { success: false, error: 'Internal server error' };
    } finally {
        client.release();
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    revalidatePath('/');
}

export async function register(formData: any) {
    const { name, email, password, role = 'user' } = formData;
    const client = await pool.connect();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
            [name, email, hashedPassword, role]
        );
        return { success: true };
    } catch (e: any) {
        console.error('Register error:', e);
        if (e.code === '23505') return { success: false, error: 'Email already exists' };
        return { success: false, error: 'Registration failed' };
    } finally {
        client.release();
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch (e) {
        return null;
    }
}

export async function updateProfile(formData: { name: string; email: string }) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [formData.name, formData.email, session.id]
        );

        // Update session cookie
        const newSession = await encrypt({ ...session, name: formData.name, email: formData.email });
        const cookieStore = await cookies();
        cookieStore.set('session', newSession, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7200
        });

        revalidatePath('/admin');
        return { success: true };
    } catch (e: any) {
        console.error('Update profile error:', e);
        if (e.code === '23505') return { success: false, error: 'Email already exists' };
        return { success: false, error: 'Update failed' };
    } finally {
        client.release();
    }
}

export async function updatePassword(formData: { currentPassword: string; newPassword: string }) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const client = await pool.connect();
    try {
        const res = await client.query('SELECT password FROM users WHERE id = $1', [session.id]);
        const user = res.rows[0];

        if (!user || !(await bcrypt.compare(formData.currentPassword, user.password))) {
            return { success: false, error: 'Incorrect current password' };
        }

        const hashedNewPassword = await bcrypt.hash(formData.newPassword, 10);
        await client.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, session.id]);

        return { success: true };
    } catch (e) {
        console.error('Update password error:', e);
        return { success: false, error: 'Password update failed' };
    } finally {
        client.release();
    }
}
