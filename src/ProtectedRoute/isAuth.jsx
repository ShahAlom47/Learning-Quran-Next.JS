"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function isAuth(Component, roles = []) {
  return function IsAuth(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session) {
        router.push("/login"); // Redirect to login if not authenticated
      } else if (roles.length > 0 && !roles.includes(session.user.role)) {
        router.push("/unauthorized"); // Redirect to unauthorized page if role doesn't match
      }
    }, [session, status, roles, router]);

    if (status === "loading") {
      return <div>Loading...</div>; // Show loading spinner while checking authentication
    }

    if (!session) {
      return null; // Show nothing if not authenticated
    }

    return <Component {...props} />;
  };
}




// use example 

// import React from 'react';
// import isAuth from '@/src/ProtectedRoute/isAuth';
// import { useSession } from 'next-auth/react';


// const Dashboard = () => {
//     const { data: session, status } = useSession();
//     return (
//         <div>


//             <h1>Dashboard</h1>
//             <p>Welcome {session?.user?.name}</p>
//         </div>
//     );
// };

// export default isAuth(Dashboard);

// export default isAuth(AdminPage, ["admin"]);