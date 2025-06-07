import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

async function verifyJWT(token: string) {
  try {
    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not set!')
      return null
    }
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; role: 'admin' | 'teacher' | 'user' }
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value
  const { pathname, origin } = request.nextUrl

  // Add debugging logs (remove in production later)
  console.log('Middleware Debug:', {
    pathname,
    origin,
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 10)}...` : 'none',
    allCookies: request.cookies.getAll().map(c => c.name),
    hasJwtSecret: !!process.env.JWT_SECRET
  })

  // Public routes - allow access without authentication
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verification-code')
  ) {
    return NextResponse.next()
  }

  // Check for token
  if (!token) {
    console.log('No token found, redirecting to login')
    return redirectToLogin(request)
  }

  // Verify token
  const decoded = await verifyJWT(token)

  if (!decoded) {
    console.log('Token verification failed, redirecting to login')
    return redirectToLogin(request)
  }

  console.log('Token verified successfully:', { userId: decoded.id, role: decoded.role })

  // Role-based redirects for root path
  if (pathname === '/') {
    if (decoded.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', origin))
    }
    if (decoded.role === 'teacher') {
      return NextResponse.redirect(new URL('/teacher', origin))
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
    return NextResponse.redirect(new URL('/', origin))
  }

  // Protect teacher routes
  if (pathname.startsWith('/teacher') && decoded.role !== 'teacher') {
    return NextResponse.redirect(new URL('/', origin))
  }

  return NextResponse.next()
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.nextUrl.origin))
  // Clear potentially corrupted cookies
  response.cookies.delete('refreshToken')
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}