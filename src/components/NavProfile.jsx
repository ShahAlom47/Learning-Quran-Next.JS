"use client"

import {  useSession } from "next-auth/react";

const NavProfile = () => {
    const {data:userData}= useSession()
    console.log(userData);
    return (
       
       <div  className=" text-red-500">
         {userData?.user?.email}
       </div>
    );
};

export default NavProfile;