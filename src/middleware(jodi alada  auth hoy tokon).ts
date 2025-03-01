import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("Middleware is running");
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("Token:", token);
  const { pathname } = req.nextUrl;
  console.log("Pathname:", pathname);

  if (token && typeof token.exp === "number" && token.exp < Date.now() / 1000) {
    console.log("Token expired, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    console.log("Unauthorized access to admin, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/moderator") && token?.role !== "moderator") {
    console.log("Unauthorized access to moderator, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/agent") && token?.role !== "agent") {
    console.log("Unauthorized access to agent, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/user") && !token) {
    console.log("User not authenticated, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/dashboard") && !token) {
    console.log("User not authenticated for dashboard, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/dashboard/admin") {
    if (token?.role === "admin") {
      console.log("Redirecting admin to admin dashboard", token?.role);
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    } else {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname === "/dashboard/user") {
    if (token?.role === "user") {
      console.log("Redirecting user to user dashboard", token?.role);
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    } else {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/dashboard/admin") && token?.role !== "admin") {
    console.log("Unauthorized access to admin dashboard, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/dashboard/user") && token?.role !== "user") {
    console.log("Unauthorized access to user dashboard, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log("Access granted, proceeding with the request");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/moderator/:path*",
    "/api/agent/:path*",
    "/api/user/:path*",
    "/admin/:path*",
    "/moderator/:path*",
    "/agent/:path*",
    "/user/:path*",
    "/dashboard/:path*",
    "/dashboard",
  ],
};
