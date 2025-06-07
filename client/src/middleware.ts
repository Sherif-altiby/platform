import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// --- IMPORTANT ---
// This check ensures your app will fail to build if the JWT_SECRET is not set.
// It's a safety measure to prevent deploying a broken app.
if (!process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is not defined.');
}

// Encode the secret key only once for efficiency.
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Verifies the JSON Web Token.
 * @param token The JWT string to verify.
 * @returns The decoded payload if the token is valid, otherwise null.
 */
async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    // Type assertion to ensure the payload has the expected shape.
    return payload as { id: string; role: 'admin' | 'teacher' | 'user' };
  } catch (error) {
    // Log the error for debugging purposes on the server.
    console.error('JWT Verification Error:', error);
    return null;
  }
}

/**
 * The main middleware function that protects routes.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value;
  const { pathname, origin } = request.nextUrl;

  // 1. Decode token if it exists.
  const decodedToken = token ? await verifyJWT(token) : null;

  // 2. Define public routes that do not require authentication.
  const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/verification-code',
  ];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // The root path '/' is treated as a special case.
  const isRootPath = pathname === '/';

  // 3. Handle redirections for AUTHENTICATED users.
  if (decodedToken) {
    // If a logged-in user tries to access a public route (like /login),
    // redirect them to their appropriate dashboard.
    if (isPublicRoute) {
      return NextResponse.redirect(new URL(`/${decodedToken.role}`, origin));
    }
  }

  // 4. Handle route protection for UNAUTHENTICATED users.
  if (!decodedToken && !isPublicRoute) {
      // If the user is not logged in and not on a public route,
      // redirect them to the login page. We allow access to the root path.
      if (!isRootPath) {
          return redirectToLogin(request);
      }
  }
  
  // 5. Handle role-based access control.
  if (decodedToken) {
      if (pathname.startsWith('/admin') && decodedToken.role !== 'admin') {
          // If a non-admin tries to access an admin route, redirect to the root.
          return NextResponse.redirect(new URL('/', origin));
      }
      if (pathname.startsWith('/teacher') && decodedToken.role !== 'teacher') {
          // If a non-teacher tries to access a teacher route, redirect to the root.
          return NextResponse.redirect(new URL('/', origin));
      }
  }

  // 6. If none of the above conditions are met, allow the request to proceed.
  return NextResponse.next();
}

/**
 * Helper function to create a redirect response to the login page.
 * @param request The original NextRequest object.
 * @returns A NextResponse object that redirects to the login page.
 */
function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  // You can add a 'from' query parameter to redirect the user back after login.
  url.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

// --- Configuration ---
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * This prevents the middleware from running on static assets and API routes,
   * which is more efficient.
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  
  // Middleware now defaults to the Edge runtime. If you have Node.js-specific
  // APIs, you can change this back to 'nodejs'. The 'jose' library works in both.
  // runtime: 'edge', // or 'nodejs'
};
