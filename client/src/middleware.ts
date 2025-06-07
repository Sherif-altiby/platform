import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Make sure this environment variable is set in Vercel
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET as string
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

    console.log("token", token)
  }
  
  // Fallback: Try custom header
  if (!token) {
    token = request.headers.get("x-auth-token");
  }
  
  // Fallback: Try cookies (recommended for SSR)
  if (!token) {
    token = request.cookies.get("token")?.value || null;
  }
  
  const { pathname, origin } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/login",
    "/register", 
    "/forgot-password",
    "/verification-code",
  ];
  
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );
  
  if (isPublicRoute && pathname !== "/") {
    return NextResponse.next();
  }
  
  // Redirect to login if no token and accessing protected route
  if (!token && !isPublicRoute) {
    return redirectToLogin(request);
  }
  
  // Verify token if present
  if (token) {
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
      return NextResponse.redirect(new URL("/login", origin));
    }
    
    if (pathname.startsWith("/teacher") && decoded.role !== "teacher") {
      return NextResponse.redirect(new URL("/login", origin));
    }
  }
  
  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.nextUrl.origin);
  // Optionally add redirect parameter
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$).*)",
  ],
};