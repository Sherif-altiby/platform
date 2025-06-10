// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyToken(token: string) {
  try {
    if (!process.env.JWT_SECRET) {
      return null;
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; role: 'admin' | 'teacher' | 'user' };
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if(!process.env.JWT_SECRET){
    NextResponse.redirect(new URL('/register', request.nextUrl.origin))
  }

  // Bypass middleware for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Enhanced cookie debugging
  const cookieHeader = request.headers.get('cookie');
  
  const cookies = request.cookies.getAll();
  
  // Try multiple ways to get the refresh token
  const refreshToken = 
    request.cookies.get('refreshToken')?.value ||
    request.cookies.get('refresh_token')?.value ||
    extractTokenFromHeader(cookieHeader, 'refreshToken') ||
    extractTokenFromHeader(cookieHeader, 'refresh_token');
    
  

  // Public routes - allow access without authentication
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verification-code')
  ) {
    return NextResponse.next();
  }

  // Check for token
  if (!refreshToken) {
    return redirectToLogin(request);
  }

  // Verify token
  const decoded = await verifyToken(refreshToken);
  if (!decoded) {
    return redirectToLogin(request);
  }


  // Role-based redirects for root path
  if (pathname === '/') {
    if (decoded.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', origin));
    }
    if (decoded.role === 'teacher') {
      return NextResponse.redirect(new URL('/teacher', origin));
    }
    return NextResponse.redirect(new URL('/user', origin));
  }

  // Protect routes by role
  if (
    (pathname.startsWith('/admin') && decoded.role !== 'admin') ||
    (pathname.startsWith('/teacher') && decoded.role !== 'teacher') ||
    (pathname.startsWith('/user') && decoded.role !== 'user')
  ) {
    return NextResponse.redirect(new URL('/login', origin));
  }

  return NextResponse.next();
}

// Helper function to manually extract token from cookie header
function extractTokenFromHeader(cookieHeader: string | null, tokenName: string): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name?.trim() === tokenName) {
      return value?.trim();
    }
  }
  return null;
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  
  // Clear cookies with different configurations to ensure they're removed
  response.cookies.delete('refreshToken');
  response.cookies.delete('refresh_token');
  
  // Set cookies to expire immediately with various domain/path combinations
  response.cookies.set('refreshToken', '', {
    expires: new Date(0),
    path: '/',
  });
  
  response.cookies.set('refresh_token', '', {
    expires: new Date(0),
    path: '/',
  });
  
  response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (your static images)
     * - Static file extensions
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|ico|webp|css|js|woff|woff2|ttf|eot)).*)',
  ],
};