import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "th", "zh"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ตรวจสอบว่า URL ปัจจุบันมี locale นำหน้าแล้วหรือยัง
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // ถ้าไม่มี locale ให้เปลี่ยนเส้นทาง (Redirect) ไปยัง defaultLocale อัตโนมัติ
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // ดักตรวจสอบทุกหน้าเพจ ยกเว้นไฟล์ static, api, หรือ assets ใน _next
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
