import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    // Skip login endpoint
    if (request.nextUrl.pathname === "/api/admin/login") {
      return NextResponse.next()
    }

    // Check for admin token
    const token =
      request.cookies.get("admin-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/admin/:path*"],
}
