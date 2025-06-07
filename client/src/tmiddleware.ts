// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// async function verifyToken(token: string) {
//   try {
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not set");
//       return null;
//     }

//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     return payload as { id: string; role: "admin" | "teacher" | "user" };
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     return null;
//   }
// }

// export async function middleware(request: NextRequest) {
//   // Log cookies for debugging
//   console.log("Cookies received:", request.cookies.getAll());
//   console.log("Cookies header:", request.headers)

//   const token = request.cookies.get("refreshToken")?.value;
//   const { pathname, origin } = request.nextUrl;

//   // Public routes - allow access without authentication
//   if (
//     pathname === "/" ||
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/register") ||
//     pathname.startsWith("/forgot-password") ||
//     pathname.startsWith("/verification-code")
//   ) {
//     return NextResponse.next();
//   }

//   // Check for token
//   if (!token) {
//     console.log("No refreshToken found, redirecting to login");
//     return redirectToLogin(request);
//   }

//   // Verify token
//   const decoded = await verifyToken(token);

//   if (!decoded) {
//     console.log("Invalid token, redirecting to login");
//     return redirectToLogin(request);
//   }

//   // Role-based redirects for root path
//   if (pathname === "/") {
//     if (decoded.role === "admin") {
//       return NextResponse.redirect(new URL("/admin", origin));
//     }
//     if (decoded.role === "teacher") {
//       return NextResponse.redirect(new URL("/teacher", origin));
//     }
//     return NextResponse.redirect(new URL("/user", origin));
//   }

//   // Protect routes by role
//   if (
//     (pathname.startsWith("/admin") && decoded.role !== "admin") ||
//     (pathname.startsWith("/teacher") && decoded.role !== "teacher") ||
//     (pathname.startsWith("/user") && decoded.role !== "user")
//   ) {
//     console.log(`Role '${decoded.role}' attempted to access restricted route: ${pathname}`);
//     return NextResponse.redirect(new URL("/login", origin));
//   }

//   return NextResponse.next();
// }

// function redirectToLogin(request: NextRequest) {
//   const response = NextResponse.redirect(new URL("/login", request.nextUrl.origin));
//   response.cookies.delete("refreshToken");
//   return response;
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };