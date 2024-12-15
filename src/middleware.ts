import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { getCurrentUser } from "./services/auth.service";

const AuthRoutes = ["/login", "/signup"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      if (pathname.includes("/checkout")) {
        return NextResponse.redirect(new URL(`/login`, request.url));
      }

      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  if (user.role === "CUSTOMER") {
    if (
      pathname.includes("/dashboard/admin") ||
      pathname.includes("/dashboard/vendor")
    ) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }
  if (user.role === "VENDOR") {
    if (
      pathname.includes("/dashboard/admin") ||
      pathname.includes("/dashboard/customer")
    ) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }
  if (user.role === "ADMIN") {
    if (
      pathname.includes("/dashboard/vendor") ||
      pathname.includes("/dashboard/customer")
    ) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:page*", "/checkout"],
};
