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
