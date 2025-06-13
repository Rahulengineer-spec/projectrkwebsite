import { NextRequest, NextResponse } from "next/server"
import { generateToken, verifyToken } from "@/lib/csrf"

export const runtime = 'experimental-edge'

export async function GET() {
  try {
    const token = generateToken()
    return NextResponse.json({ token })
  } catch (error) {
    console.error("Error generating CSRF token:", error)
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body
    
    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    const isValid = verifyToken(token)
    return NextResponse.json({ valid: isValid })
  } catch (error) {
    console.error("Error validating CSRF token:", error)
    return NextResponse.json(
      { error: "Token validation failed" },
      { status: 500 }
    )
  }
} 