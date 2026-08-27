'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'crypto'

const SESSION_COOKIE = 'admin_session'
const SESSION_DURATION = 60 * 60 * 24 * 7 // 7 days in seconds

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function loginAction(password: string): Promise<{ success: boolean; error?: string }> {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return { success: false, error: 'Admin login is not configured.' }
  }

  if (password !== adminPassword) {
    return { success: false, error: 'Invalid password.' }
  }

  const token = generateSessionToken()
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })

  return { success: true }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/admin/login')
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  return !!session?.value
}
