import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; role: 'admin' | 'teacher' | 'user' }
  } catch (error) {
    console.log('JWT verification failed:', error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value
  const { pathname, origin } = request.nextUrl

  console.log('Middleware running for:', pathname)
  console.log('Token present:', !!token)

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/verification-code'
  ]

  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  // Allow access to public routes
  if (isPublicRoute) {
    console.log('Public route accessed:', pathname)
    return NextResponse.next()
  }

  // Handle root path ("/") - this needs special logic
  if (pathname === '/') {
    if (!token) {
      console.log('No token for root path, redirecting to login')
      return redirectToLogin(request)
    }

    const decoded = await verifyJWT(token)
    if (!decoded) {
      console.log('Invalid token for root path, redirecting to login')
      return redirectToLogin(request)
    }

    // Redirect based on role
    console.log('Valid token for root, user role:', decoded.role)
    if (decoded.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', origin))
    }
    if (decoded.role === 'teacher') {
      return NextResponse.redirect(new URL('/teacher', origin))
    }
    
    // For regular users, you might want to redirect to a dashboard
    // or allow them to stay at root - adjust as needed
    return NextResponse.next()
  }

  // For all other protected routes, check if token exists
  if (!token) {
    console.log('No token for protected route:', pathname)
    return redirectToLogin(request)
  }

  // Verify the token
  const decoded = await verifyJWT(token)
  if (!decoded) {
    console.log('Invalid token for protected route:', pathname)
    return redirectToLogin(request)
  }

  console.log('Token verified for user:', decoded.id, 'role:', decoded.role)

  // Role-based protection
  if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
    console.log('Non-admin trying to access admin route')
    return NextResponse.redirect(new URL('/unauthorized', origin))
  }

  if (pathname.startsWith('/teacher') && decoded.role !== 'teacher' && decoded.role !== 'admin') {
    console.log('Non-teacher trying to access teacher route')
    return NextResponse.redirect(new URL('/unauthorized', origin))
  }

  // Allow access to the protected route
  console.log('Access granted to:', pathname)
  return NextResponse.next()
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.nextUrl.origin)
  // Optionally preserve the intended destination
  if (request.nextUrl.pathname !== '/') {
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
  }
  console.log('Redirecting to login:', loginUrl.toString())
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)'
  ],
}