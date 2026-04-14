import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  // 1. إرسال البيانات للباك إند الحقيقي (الخاص بك)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // 2. هنا السحر: استخراج التوكن من رد الباك إند وضبطه في كوكيز Next.js
  const token = data.data.refreshToken;
  const cookieStore = await cookies();

  cookieStore.set("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 أيام
  });

  // 3. إعادة بيانات المستخدم للفرونت إند (Zustand)
  return NextResponse.json(data);
}
