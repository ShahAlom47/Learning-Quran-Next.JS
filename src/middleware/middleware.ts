import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// ⏩ Custom Middleware function with role protection
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl; // URL path

  // Type the token properly to ensure 'exp' is recognized as a number
  if (token && typeof token.exp === "number" && token.exp < Date.now() / 1000) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔹 Role-based Access Control
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/moderator") && token?.role !== "moderator") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/agent") && token?.role !== "agent") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // // Forward the request to the Node.js server
  // const url = new URL(req.url);
  // url.hostname = "your-nodejs-server.com"; // Replace with your Node.js server hostname
  // url.port = "your-nodejs-server-port"; // Replace with your Node.js server port

  // return NextResponse.rewrite(url);

  return NextResponse.next(); // If everything is fine, proceed with the request
}

// 🔹 Define protected routes using the matcher
export const config = {
  matcher: [
    "/api/admin/:path*", // Admin API routes protected
    "/api/moderator/:path*", // Moderator API routes protected
    "/api/agent/:path*", // Agent API routes protected
    "/api/user/:path*", // User API routes protected
    "/admin/:path*", // Admin UI routes protected
    "/moderator/:path*", // Moderator UI routes protected
    "/agent/:path*", // Agent UI routes protected
    "/user/:path*", // User UI routes protected
  ],
};

// Use withAuth to handle authentication
export default withAuth({
  pages: {
    signIn: "/login", // if not logged in, redirect to login page
  },
});