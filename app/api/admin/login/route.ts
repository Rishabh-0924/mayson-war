export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import { generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Simple authentication (in production, use proper password hashing)
    if (username === "admin" && password === "mayson@123") {
      const user = {
        id: "1",
        username: "admin",
        isAdmin: true,
      }

      const token = generateToken(user)

      const response = NextResponse.json({
        success: true,
        token,
        user: {
          username: user.username,
          isAdmin: user.isAdmin,
        },
      })

      // Set cookie as well
      response.cookies.set("admin-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 hours
      })

      return response
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
