"use client";

import { useNotification } from "@/src/components/Notification";
import PaginationBtn from "@/src/components/PaginationBtn";
import useUser from "@/src/hooks/useUser";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/src/Redux/RTKapi/userApi";
import Image from "next/image";
import { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import SearchBar from "@/src/components/SearchBar"; // 🔹 Import SearchBar
import Loading from "@/src/app/loading";

const AllUser = ({ userType }) => {
  const [updateUserRole] = useUpdateUserRoleMutation();
  const { user: currentUser } = useUser();
  const { showNotification } = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 Search State
  const limit = 5;

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery({
    page: currentPage,
    limit,
    search: searchQuery,
    userType: userType || "all",
  });

  console.log(users);

  const totalPage = users?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-red-500">Failed to load users.</p>;

  // 🔹 Handle user role update
  const handleRoleChange = async (userId, newRole) => {
    console.log("Updating role for user:", userId, "New Role:", newRole);
    try {
      const response = await updateUserRole({
        id: userId,
        role: newRole,
      }).unwrap();
      console.log("Update response:", response);

      if (response?.error) {
        console.error("Error response:", response.error);
        showNotification("Failed to update user role", "error");
      } else {
        console.log("User role updated successfully:", response);
        showNotification("User role updated successfully!", "success");
        refetch();
      }
    } catch (error) {
      console.error("Error in updating role:", error);
      showNotification("Something went wrong!", "error");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold mb-4 capitalize">
        {" "}
        {userType ? userType : "All"} Users
      </h1>

      {/* 🔹 Search Bar Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Table Component */}
      <Table className="w-full border border-gray-300">
        <Thead>
          <Tr className="bg-gray-200">
            <Th className="text-start p-2">Profile</Th>
            <Th className="text-start p-2">User ID</Th>
            <Th className="text-start p-2">Name</Th>
            <Th className="text-start p-2">Email</Th>
          
            <Th className="text-start p-2">User Type</Th>
            {/* Conditionally render Action column based on userType */}
            {(userType !== "student" && userType !== "teacher") && (
              <Th className="text-start p-2">Action</Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {(users?.data || []).map((user) => (
            <Tr key={user._id} className=" mb-3 border-gray-300 hover:bg-slate-300 rounded-sm">
              <Td className="p-2">
                <Image
                  src={user.photoUrl}
                  alt="user photo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Td>
              <Td className="p-2">{user.userId}</Td>
              <Td className="p-2">{user.name}</Td>
              <Td className="p-2">{user.email}</Td>
              <Td className="p-2 font-semibold">{user.role}</Td>
              
              {/* Only show role change dropdown if userType is not student or teacher */}
              {(userType !== "student" && userType !== "teacher") && (
                <Td className="p-2">
                  {/* Role Change Dropdown */}
                  <select
                    className="border p-1 rounded bg-gray-100 disabled:cursor-not-allowed"
                    defaultValue={user.role}
                    onChange={(e) =>
                      handleRoleChange(user?._id, e.target.value)
                    }
                    disabled={
                      user?.role === "admin" || user?.role === "moderator"
                    }
                  >
                    {currentUser?.role === "moderator" && (
                      <>
                        <option value="user">User</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                      </>
                    )}
                    {currentUser?.role === "admin" && (
                      <>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="user">User</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                      </>
                    )}
                  </select>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination Buttons */}
      {totalPage > 1 && (
        <div className="mt-4">
          <PaginationBtn
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllUser;
