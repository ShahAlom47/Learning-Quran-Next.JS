"use client"

import {  useSession } from "next-auth/react";

const NavProfile = () => {
    const session= useSession()
    console.log(session);
    return (
       
       <div>
         {children}
       </div>
    );
};

export default NavProfile;