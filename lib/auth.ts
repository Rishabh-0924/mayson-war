import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  id: string
  username: string
  isAdmin: boolean
}

export function generateToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "24h" })
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User
    console.log("✅ Token verified:", decoded)
    return decoded
  } catch (err) {
    console.error("❌ Token verification failed:", err)
    return null
  }
}


export async function requireAuth(request: NextRequest): Promise<User | null> {
  const authHeader = request.headers.get("authorization")
  console.log("🔐 Auth Header:", authHeader) // Add this

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("❌ No bearer token")
    return null
  }

  const token = authHeader.replace("Bearer ", "")
  console.log("🔑 Extracted token:", token) // Add this

  return await verifyToken(token)
}

