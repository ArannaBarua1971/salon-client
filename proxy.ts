import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./lib/auth"
import { headers } from "next/headers"

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  const { pathname } = request.nextUrl

  // Not logged in
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  const role = session.user.role

  // Admin routes
  if (pathname.startsWith("/dashboard/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
  }

  // Customer routes
  if (pathname.startsWith("/dashboard/customer") && role !== "customer") {
    return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    "/services/:id/:path*",
    "/dashboard/:path*",
  ],
}
