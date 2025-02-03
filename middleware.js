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

                // **এখানে লগিক যুক্ত করতে হবে যে কোন রুটগুলোতে অথেনটিকেশন প্রয়োজন নয়।**
                
                // Public routes that do not require authentication
                if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
                    return true; // Login বা Signup রুটগুলোতে যাওয়া যাবে
                }

                // Check if token exists
                if (!token) {
                    return false; // যদি টোকেন না থাকে, তাহলে ইউজারকে অ্যাক্সেস দেওয়া হবে না
                }

                // Optionally, check user role or other conditions
                // if (token.role !== 'admin') {
                //     return false; // নির্দিষ্ট রোল না থাকলে অ্যাক্সেস দেওয়া হবে না
                // }

                // If the token exists and the path is authorized, allow access
                return true; // অন্যথায়, ইউজারকে অনুমতি দেওয়া হবে
            },
        },
    }
);
