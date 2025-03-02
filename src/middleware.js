import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        console.log("Middleware Executed:", pathname);

        // ✅ Public Routes (No authentication required)
        const publicRoutes = ["/register", "/login", "/"];
        if (
          publicRoutes.includes(pathname) ||
          pathname.startsWith("/api/auth")
        ) {
          return true;
        }

        // ❌ Unauthorized User Redirect to Login
        if (!token) {
          return NextResponse.redirect(new URL("/login", req.url));
        }

        // ✅ Role-based Access Control
        const role = token.role;

        if (
          pathname.startsWith("/dashboard/admin") ||
          pathname.startsWith("/api/admin")
        ) {
          return role === "admin";
        }

        if (
          pathname.startsWith("/dashboard/moderator") ||
          pathname.startsWith("/api")
        ) {
          return role === "moderator";
        }

        if (
          pathname.startsWith("/dashboard/agent") ||
          pathname.startsWith("/api/agent")
        ) {
          return role === "agent";
        }

        if (
          pathname.startsWith("/dashboard/user") ||
          pathname.startsWith("/api/user")
        ) {
          return role === "user";
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
