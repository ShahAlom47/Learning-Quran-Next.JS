// app/dashboard/moderator/viewUser/[userId]/page.js
import React from 'react';
import UserDetails from '@/src/components/UserDetails';
import store from '@/src/Redux/store/store'; // Ensure the store is correctly imported
import { userApi } from '@/src/Redux/RTKapi/userApi'; // Ensure correct API import

// Server component to fetch user data using RTK Query
const ViewUser = async ({ params }) => {
    const { userId } = await params;
    console.log(userId,'user id ');

    // Dispatch the getUser query manually using the correct syntax
    const result = await store.dispatch(userApi.endpoints.getUser.initiate({ userId }));

    // Get the data from the result
    const userData = result?.data?.data;
    console.log(userData);  // For debugging, make sure you see the correct data

    return (
        <div>
            {/* Pass the fetched user data to the UserDetails component */}
            <UserDetails user={userData || {}} />
        </div>
    );
};

export default ViewUser;
