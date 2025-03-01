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
        console.log(token);

        // ✅ Public routes (Authentication লাগবে না)
        const publicRoutes = ["/register", "/login", "/"];
        if (publicRoutes.includes(pathname) || pathname.startsWith("/api/auth")) {
          return true;
        }

   
        if (!token) {
          return false;
        }

        // ✅ Role-based Access Control  
        const role = token.role; 

        // 🔹 Admin Routes
        if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
          return role === "admin";
        }

        // 🔹 Moderator Routes
        if (pathname.startsWith("/moderator") || pathname.startsWith("/api/moderator")) {
          return role === "moderator";
        }

        // 🔹 Agent Routes 
        if (pathname.startsWith("/agent") || pathname.startsWith("/api/agent")) {
          return role === "agent";
        }

        // 🔹 User Routes
        if (pathname.startsWith("/user") || pathname.startsWith("/api/user")) {
          return role === "user" || role === "admin"; 
        }

      
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
