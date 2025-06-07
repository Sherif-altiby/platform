import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

async function verifyJWT(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
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

  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verification-code')
  ) {
    return NextResponse.next()
  }

  if (!token) {
    return redirectToLogin(request)
  }

  const decoded = await verifyJWT(token)

  if (!decoded) {
    return redirectToLogin(request)
  }

  if (pathname === '/') {
    if (decoded.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', origin))
    }
    if (decoded.role === 'teacher') {
      return NextResponse.redirect(new URL('/teacher', origin))
    }
  }

  if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
    return NextResponse.redirect(new URL('/', origin))
  }

  if (pathname.startsWith('/teacher') && decoded.role !== 'teacher') {
    return NextResponse.redirect(new URL('/', origin))
  }

  return NextResponse.next()
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL('/login', request.nextUrl.origin))
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}
