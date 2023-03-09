import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathWithoutPaddingZeros = pathname.replace(/\/0/g, "/");
  // just in case to avoid an infinite loopG˝
  if (pathname === pathWithoutPaddingZeros) {
    return NextResponse.next();
  }
  return NextResponse.redirect(
    new URL(pathWithoutPaddingZeros, request.url),
    301
  );
}

export const config = {
  matcher: ["/(\\d{4})/0(\\d)", "/(\\d{4})/(\\d{1,2})/0(\\d)"],
};
