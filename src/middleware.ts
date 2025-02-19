import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// ⏩ Custom Middleware function with role protection
export async function middleware(req: NextRequest) {
  console.log("Middleware is running"); // Debugging log
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("Token:", token); // Debugging log
  const { pathname } = req.nextUrl; // URL path
  console.log("Pathname:", pathname); // Debugging log

  // Type the token properly to ensure 'exp' is recognized as a number
  if (token && typeof token.exp === "number" && token.exp < Date.now() / 1000) {
    console.log("Token expired, redirecting to login"); // Debugging log
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔹 Role-based Access Control
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    console.log("Unauthorized access to admin, redirecting"); // Debugging log
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/moderator") && token?.role !== "moderator") {
    console.log("Unauthorized access to moderator, redirecting"); // Debugging log
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/agent") && token?.role !== "agent") {
    console.log("Unauthorized access to agent, redirecting"); // Debugging log
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/user") && !token) {
    console.log("User not authenticated, redirecting to login"); // Debugging log
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/dashboard") && !token) {
    console.log("User not authenticated for dashboard, redirecting to login"); // Debugging log
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect to appropriate dashboard based on role

  if (pathname === "/dashboard/admin"  ) {

    if (token?.role === "admin") {
      console.log("Redirecting admin to admin dashboard", 'user Role', token?.role); // Debugging log
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    } 
     else {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname === "/dashboard/user"  ) {

    if (token?.role === "user") {
      console.log("Redirecting user to user dashboard", 'user Role', token?.role); // Debugging log
      return NextResponse.redirect(new URL("/dashboard/user", req.url)); 
    } else {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }




  // Ensure only admin can access /dashboard/admin
  if (pathname.startsWith("/dashboard/admin") && token?.role !== "admin") {
    console.log("Unauthorized access to admin dashboard, redirecting"); // Debugging log
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Ensure only user can access /dashboard/user
  if (pathname.startsWith("/dashboard/user") && token?.role !== "user") {
    console.log("Unauthorized access to user dashboard, redirecting"); // Debugging log
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log("Access granted, proceeding with the request"); // Debugging log
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
    "/dashboard/:path*", // Dashboard routes protected
    "/dashboard", // Dashboard root route protected
  ],
};