import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string)

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; role: 'admin' | 'teacher' | 'user' }
  } catch (error) {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value
  const { pathname, origin } = request.nextUrl

  // Public routes without auth
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verification-code') 
  ) {
    return NextResponse.next()
  }

  // Redirect to login if no token
  if (!token) {
    return redirectToLogin(request)
  }

  const decoded = await verifyJWT(token)

  if (!decoded) {
    return redirectToLogin(request)
  }

  // Redirect based on role if path is root
  if (pathname === '/') {
    if (decoded.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', origin))
    }
    if (decoded.role === 'teacher') {
      return NextResponse.redirect(new URL('/teacher', origin))
    }
  }

  // Role-based protection
  if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
    return NextResponse.redirect(new URL('/', origin))
  }

  if (pathname.startsWith('/teacher') && decoded.role !== 'teacher') {
    return NextResponse.redirect(new URL('/', origin))
  }

  return NextResponse.next()
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL('/register', request.nextUrl.origin))
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'], // match everything except Next.js internals and favicon
}
