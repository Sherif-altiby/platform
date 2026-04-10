import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken')?.value 
  const { pathname } = request.nextUrl

  // 1. إذا كان المستخدم في صفحة تسجيل الدخول ومعه توكن -> وجهه للرئيسية
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. إذا كان المستخدم في صفحة تسجيل الدخول وليس معه توكن -> اسمح له بالدخول
  if (pathname === '/login') {
    return NextResponse.next()
  }
  if (pathname === '/register') {
    return NextResponse.next()
  }

  // 3. حماية باقي المسارات: إذا لم يوجد توكن -> وجهه لصفحة تسجيل الدخول
  if (!token) {
    console.log("NOt token")
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log(token)
  // 4. إذا وجد توكن وهو ليس في صفحة تسجيل الدخول -> اسمح له بالمرور لأي مسار آخر
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * الماتشر يغطي كل شيء ما عدا الملفات التقنية والصور المذكورة
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|logo.png|pdf.png|teacher-card.png).*)',
  ],
}