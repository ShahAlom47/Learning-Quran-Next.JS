import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    middleware = () => {
        return NextResponse.next();
    },
    {

        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // je path  privet korte hobe se path a  false return korle  seta privet hoye jabe 

                // Public routes that do not require authentication

                if (pathname.startsWith('/api/auth') ||
                    pathname === '/register' ||
                    pathname === '/login' ||
                    pathname === '/'


                ) {
                    return true;
                }

                // Check if token exists
                if (!token) {
                    return false;
                }

            },
        },
    }
);

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }