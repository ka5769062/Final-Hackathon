import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get("logged");

  if (!isLogin) {
    if (request.nextUrl.pathname.startsWith("/Dashboard")) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  } else {
    if (url.pathname === "/") {
      url.pathname = "/Dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}
