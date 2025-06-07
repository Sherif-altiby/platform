import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET as string // Remove NEXT_PUBLIC_ for server-side secrets
);

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; role: "admin" | "teacher" | "user" };
  } catch (error) {
    console.log("JWT Error:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  let token: string | null = null;

  // Try to get token from Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  // Fallback: Try custom header
  if (!token) {
    token = request.headers.get("x-auth-token");
  }

  const { pathname, origin } = request.nextUrl;

  // Public routes without auth
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/verification-code") 
    ) {
    return NextResponse.next();
  }

  // Redirect to login if no token
  if (!token) {
    return redirectToLogin(request);
  }

  const decoded = await verifyJWT(token);

  if (!decoded) {
    console.log("Invalid token");
    return redirectToLogin(request);
  }

  // Redirect based on role if path is root
  if (pathname === "/") {
    if (decoded.role === "admin") {
      return NextResponse.redirect(new URL("/admin", origin));
    }
    if (decoded.role === "teacher") {
      return NextResponse.redirect(new URL("/teacher", origin));
    }
  }

  // Role-based protection
  if (pathname.startsWith("/admin") && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", origin));
  }

  if (pathname.startsWith("/teacher") && decoded.role !== "teacher") {
    return NextResponse.redirect(new URL("/unauthorized", origin));
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
};