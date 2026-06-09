import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // تعريف المسارات المتاحة للجميع
  const isPublicPath = pathname === "/";

  
  if (isPublicPath ) {
    return NextResponse.next();
  }

  // 3. حماية أي مسار آخر (Private Routes) إذا لم يوجد توكن
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. السماح بالمرور في أي حالة أخرى (مستخدم مسجل دخول ويحاول دخول صفحة خاصة)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * استثناء الملفات الثابتة والتقنية لضمان عدم حدوث Redirect لملفات الصور أو السكريبتات
     */
    "/((?!api|_next/static|_next/image|favicon.ico|main-logo.png|sw.js).*)",
  ],
};
