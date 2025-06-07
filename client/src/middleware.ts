import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

/**
 * Verifies the JSON Web Token.
 * @param token The JWT string to verify.
 * @param secret The secret key as a Uint8Array.
 * @returns The decoded payload if the token is valid, otherwise null.
 */
async function verifyJWT(token: string, secret: Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, secret);
    // Type assertion to ensure the payload has the expected shape.
    return payload as { id: string; role: 'admin' | 'teacher' | 'user' };
  } catch (error) {
    // This will catch errors like an expired or invalid token.
    console.error('JWT Verification Error:', error);
    return null;
  }
}

/**
 * The main middleware function that protects routes.
 */
export async function middleware(request: NextRequest) {
  try {
    const { pathname, origin } = request.nextUrl;
    const token = request.cookies.get('refreshToken')?.value;

    // --- CRITICAL RUNTIME CHECK ---
    // This check runs on every middleware invocation.
    // If the environment variable is missing, we log the error and
    // prevent the app from running in an insecure state.
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('FATAL: JWT_SECRET environment variable is not set at runtime.');
      return redirectToLogin(request);
    }
    
    // Encode the secret once we know it exists.
    const secret = new TextEncoder().encode(jwtSecret);

    // 1. Decode token if it exists.
    const decodedToken = token ? await verifyJWT(token, secret) : null;

    // 2. Define public routes that do not require authentication.
    const publicRoutes = [
      '/', // The root is a public marketing/landing page.
      '/login',
      '/register',
      '/forgot-password',
      '/verification-code',
    ];
    const isPublicRoute = publicRoutes.some(route => pathname === route || (route !== '/' && pathname.startsWith(route)));

    // 3. Handle AUTHENTICATED users
    if (decodedToken) {
      const userRole = decodedToken.role;
      
      // If a logged-in user tries to access a public route (like /login),
      // redirect them to their appropriate dashboard.
      if (isPublicRoute && pathname !== `/${userRole}`) {
        return NextResponse.redirect(new URL(`/${userRole}`, origin));
      }
      
      // Role-based protection. If a user is on the wrong dashboard, redirect them.
      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL(`/${userRole}`, origin));
      }
      if (pathname.startsWith('/teacher') && userRole !== 'teacher') {
        return NextResponse.redirect(new URL(`/${userRole}`, origin));
      }

    // 4. Handle UNAUTHENTICATED users
    } else if (!isPublicRoute) {
      // If user is not logged in and the route is not public, redirect to login.
      return redirectToLogin(request);
    }

    // 5. If none of the above conditions are met, allow the request to proceed.
    return NextResponse.next();

  } catch (error) {
    // --- CATCH-ALL FOR UNEXPECTED ERRORS ---
    // This prevents the `MIDDLEWARE_INVOCATION_FAILED` error page from showing.
    console.error('An unexpected error occurred in middleware:', error);
    // Redirect to login as a safe fallback.
    return redirectToLogin(request);
  }
}

/**
 * Helper function to create a redirect response to the login page.
 * @param request The original NextRequest object.
 * @returns A NextResponse object that redirects to the login page.
 */
function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
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
   * This prevents the middleware from running on static assets and API routes.
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
