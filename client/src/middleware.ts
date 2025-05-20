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

  // Allow access to public routes
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next()
  }

  // Redirect to login if no token
  if (!token) {
    return redirectToLogin(request)
  }

  const decoded = await verifyJWT(token)

  // Role-based protection
  if (pathname.startsWith('/admin') && decoded?.role !== 'admin') {
    return NextResponse.redirect(`${origin}/`)
  }

  if (pathname.startsWith('/teacher') && decoded?.role !== 'teacher') {
    return NextResponse.redirect(`${origin}/`)
  }

  return NextResponse.next()
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.nextUrl.origin)
  loginUrl.searchParams.set('from', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'], // match everything except Next.js internals and favicon
}
