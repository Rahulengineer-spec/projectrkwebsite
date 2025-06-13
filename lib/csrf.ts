import { NextRequest, NextResponse } from "next/server"
import { randomBytes, createHash } from 'crypto'

const CSRF_SECRET = process.env.CSRF_SECRET || randomBytes(32).toString('hex')
const CSRF_COOKIE_NAME = '__Host-csrf-token'
const TOKEN_SALT_LENGTH = 8

// Generate a random salt
function generateSalt(): string {
  return randomBytes(TOKEN_SALT_LENGTH).toString('hex')
}

// Create a hash of the salt and secret
function createTokenHash(salt: string): string {
  return createHash('sha256')
    .update(salt + CSRF_SECRET)
    .digest('hex')
}

// Generate a new CSRF token
export function generateToken(): string {
  const salt = generateSalt()
  const hash = createTokenHash(salt)
  return `${salt}.${hash}`
}

// Verify a CSRF token
export function verifyToken(token: string): boolean {
  try {
    const [salt, hash] = token.split('.')
    if (!salt || !hash) return false
    
    const expectedHash = createTokenHash(salt)
    return hash === expectedHash
  } catch {
    return false
  }
}

// Set CSRF cookie
export function setCsrfCookie(response: NextResponse, token: string) {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

// CSRF middleware
export async function csrfMiddleware(request: NextRequest) {
  // Skip CSRF check for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return null
  }

  const csrfToken = request.headers.get('X-CSRF-Token')
  if (!csrfToken) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing CSRF token' }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  const isValid = verifyToken(csrfToken)
  if (!isValid) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return null
} 