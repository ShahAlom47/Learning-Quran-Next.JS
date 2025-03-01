"use client"

import { useSession } from 'next-auth/react';
import React from 'react';

const useUser = () => {
      const session= useSession()
    return {
        user: session?.data?.user,
        status:session?.status,
        expire: session?.data?.expires,

    };
};

export default useUser;