import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { csrfMiddleware } from "@/lib/csrf"

export const runtime = 'experimental-edge'

// List of paths that require CSRF protection
const protectedPaths = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/reset-password',
  '/api/profile',
  '/api/blog',
  '/api/admin',
]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // CORS headers
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-csrf-token",
      },
    })
  }

  // CSRF protection for non-GET methods
  if (
    request.method !== 'GET' &&
    protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))
  ) {
    const csrfError = await csrfMiddleware(request)
    if (csrfError) {
      return csrfError
    }
  }

  // Temporarily disable authentication for development
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/instructor/:path*",
    "/dashboard/:path*",
    "/api/:path*",
    "/((?!api/csrf|_next/static|_next/image|favicon.ico|public).*)",
    '/login',
    '/register',
  ],
} 