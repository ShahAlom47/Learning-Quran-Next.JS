"use client";

import { useNotification } from "@/src/components/Notification";
import useUser from "@/src/hooks/useUser";
import { getAllUsers, updateUserRole } from "@/src/lib/api_request/api_request"; // updateUserRole API যোগ করা হয়েছে
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"; // CSS স্টাইল ইমপোর্ট

const AllUser = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useUser();
  const { showNotification } = useNotification();

  // Fetch all users
  const {
    data: allUser,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getAllUsers();

      return res?.data?.data || [];
    },
  });

  // Update role mutation
  const mutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const res = await updateUserRole(userId, newRole);
      if (res?.success) {
        showNotification("User role updated successfully!", "success");
      } else {
        showNotification("Failed to update user role", "error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  // Role update function
  const handleRoleChange = (userId, newRole) => {
    mutation.mutate({ userId, newRole });
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
          {allUser?.map((user) => (
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
              <Td className="p-2">{/* Action খালি রাখা হলো */}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default AllUser;
