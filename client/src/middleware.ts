import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // حدد هنا المسارات التي "يمنع" دخولها بدون تسجيل دخول
  const isPrivateRoute = 
    pathname.startsWith("/profile") || 
    pathname.startsWith("/settings") ||
    pathname.startsWith("/my-courses"); // أي صفحة تخص بيانات الطالب الشخصية

  // 1. إذا كان المستخدم مسجل دخول ويحاول دخول صفحة الـ Login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. إذا كان يحاول دخول صفحة خاصة وهو غير مسجل دخول
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. أي مسار آخر (المعلم، الدروس، المواد، الرئيسية) اتركه يمر
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|logo.png|sw.js).*)"],
};