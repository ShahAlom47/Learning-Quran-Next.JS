"use client"
import React from 'react';
import UserDetails from '@/src/components/UserDetails';
import { useGetUserQuery } from '@/src/Redux/RTKapi/userApi';
import { useParams } from 'next/navigation';

const ViewUser = () => {
    const { userId } = useParams(); 
  

    const { data: userData, isLoading ,refetch} = useGetUserQuery(
        { userId }, // Pass the userId to the query
        { skip: !userId } // Don't run the query if userId is not available
    );


 
    if (isLoading) {
        return <h1 className="text-center text-2xl text-black font-semibold">Loading...</h1>;
    }

 

    return (
        <div>
            {userData ? (
                <UserDetails user={userData?.data} refetch={refetch} />
            ) : (
                <h1 className="text-center text-2xl text-black font-semibold">User Not Found</h1>
            )}
        </div>
    );
};

export default ViewUser;
