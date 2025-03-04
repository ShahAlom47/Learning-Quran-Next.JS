"use client";

import { useNotification } from "@/src/components/Notification";
import PaginationBtn from "@/src/components/PaginationBtn";
import useUser from "@/src/hooks/useUser";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/src/Redux/RTKapi/userApi";
import Image from "next/image";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"; 

const AllUser = () => {
  const { user: currentUser } = useUser();
  const { showNotification } = useNotification();

  // 🔹 All users data from RTK Query
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();

  console.log(users);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p className="text-red-500">Failed to load users.</p>;


  // 🔹 Handle user role update
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await updateUserRole({ id: userId, role: newRole });

      if ("error" in response) {
        showNotification("Failed to update user role", "error");
      } else {
        showNotification("User role updated successfully!", "success");
        refetch(); // ✅ Update successful হলে data reload হবে
      }
    } catch (error) {
      showNotification("Something went wrong!", "error");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold mb-4">All Users</h1>

      {/* Table Component */}
      <Table className="w-full border border-gray-300">
        <Thead>
          <Tr className="bg-gray-200">
            <Th className="text-start p-2">Profile</Th>
            <Th className="text-start p-2">Name</Th>
            <Th className="text-start p-2">Email</Th>
            <Th className="text-start p-2">User Type</Th>
            <Th className="text-start p-2">Change Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.data?.map((user) => (
            <Tr key={user._id} className="border-b border-gray-300">
              <Td className="p-2">
                <Image
                  src={user.photoUrl}
                  alt="user photo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Td>
              <Td className="p-2">{user.name}</Td>
              <Td className="p-2">{user.email}</Td>
              <Td className="p-2 font-semibold">{user.role}</Td>
              <Td className="p-2">
                {/* Role Change Dropdown */}
                <select
                  className="border p-1 rounded bg-gray-100 disabled:cursor-not-allowed"
                  defaultValue={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  disabled={user.role === "admin" || user.role === "moderator"} // অ্যাডমিন হলে অপশন চেঞ্জ হবে না
                >
                  {/* Moderator হলে কেবল 3 টা রোল পাবে */}
                  {currentUser?.role === "moderator" && (
                    <>
                      <option value="user">User</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </>
                  )}

                  {currentUser?.role === "admin" && (
                    <>
                      {/* Admin হলে সব রোল পাবে */}
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="user">User</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </>
                  )}
                </select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div>
      <PaginationBtn
        currentPage={4}
        totalPages={10}
        // onPageChange={}
      />
      </div>
    </div>
  );
};

export default AllUser;
