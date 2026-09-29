'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  SESSION_COOKIE,
  SESSION_DURATION,
  createSessionToken,
  verifyPassword,
  verifySessionToken,
} from './session'

export async function loginAction(password: string): Promise<{ success: boolean; error?: string }> {
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return { success: false, error: 'Admin login is not configured.' }
  }

  if (!verifyPassword(password)) {
    // Slow down repeated guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: false, error: 'Invalid password.' }
  }

  const token = createSessionToken()
  if (!token) {
    return { success: false, error: 'Admin login is not configured.' }
  }

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
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}
