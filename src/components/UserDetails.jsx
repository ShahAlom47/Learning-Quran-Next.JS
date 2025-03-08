"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  useAddToStudentOrTeacherListMutation,
  useGetUsersQuery,
} from "../Redux/RTKapi/userApi";
import { MdDelete } from "react-icons/md";
import { useNotification } from "./Notification";

const UserDetails = ({ user, refetch }) => {
  const {
    data: users,
    isLoading,
    isError,
  } = useGetUsersQuery({
    userType: user?.role === "student" ? "teacher" : "student",
  });

  const [addToStudentOrTeacherList] = useAddToStudentOrTeacherListMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const { showNotification } = useNotification();
  const thisUserRole = user?.role;

  // 🔍 Filtered user list (suggestions)
  const filteredUsers =
    users?.data?.filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // ✅ Function to handle adding a new user
  const handleAddUser = async () => {
    if (!selectedUser || !user?.userId) return;

    const addTeacherPayload = {
      studentId: user?.userId,
      studentName: user?.name,
      teacherId: selectedUser.userId,
      teacherName: selectedUser.name,
      role: user?.role,
    };

    const addStudentPayload = {
      teacherId: user?.userId,
      teacherName: user?.name,
      studentId: selectedUser.userId,
      studentName: selectedUser.name,
      role: user?.role,
    };

    const res = await addToStudentOrTeacherList(
      thisUserRole === "student" ? addTeacherPayload : addStudentPayload
    );
    if (res?.data?.success) {
      showNotification(`${selectedUser?.role} added successfully`, "success");
      setSelectedUser(null)
      setSearchTerm('')
      refetch(); // Refetch after successful addition
    }

    console.log("Response from backend:", res?.data);
  };

  return (
    <div className="text-black my-10 p-4">
      <div className="flex justify-between gap-4 border-b-2 px-3 border-black pb-5">
        <div>
          <div className="rounded-full w-12 h-12 overflow-hidden flex items-center">
            <Image src={user?.photoUrl} width={50} height={50} alt="user photo" />
          </div>
          <h1 className="text-xl font-bold">
            {user?.name} <span className="text-sm">({user?.role})</span>
          </h1>
        </div>
        <div className=" flex items-end  ">
          <button className=" capitalize btn btn-primary btn-sm  ">Edit {user?.role}</button>
        </div>
      </div>

      {user?.role === "student" || user?.role === "teacher" ? (
        <div className="text-black border border-black p-2 my-5">
          <div className="flex justify-between gap-3 border-b border-black py-1 px-4 mb-6">
            <h1 className="capitalize text-xl">{user?.role}s</h1>
            <button
              onClick={() => setOpenAdd(!openAdd)}
              className="btn-sm rounded-sm btn-outline border border-black text-black"
            >
              Add {user?.role === "student" ? "Teacher" : "Student"}
            </button>
          </div>

          <div>
            {/* Add new Teacher/Student form */}
            <div
              className={`p-3 border border-gray-300 rounded my-3 ${openAdd ? "block" : "hidden"}`}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={`Search ${user?.role === "student" ? "Teacher" : "Student"} Name`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-1 border border-gray-400 rounded bg-gray-400"
                />
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-500 text-white rounded w-2/12"
                >
                  Add
                </button>
              </div>

              {/* Display suggestion list */}
              {searchTerm && filteredUsers.length > 0 && (
                <ul className="border border-gray-400 rounded mt-2">
                  {filteredUsers.map((u) => (
                    <li
                      key={u._id}
                      onClick={() => {
                        setSelectedUser(u);
                        setSearchTerm(u.name); // Set search term to user name
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {u.name} - {u.userId}
                    </li>
                  ))}
                </ul>
              )}

              {/* Display selected user */}
              {selectedUser && (
                <div className="mt-2 text-sm text-gray-700">
                  Selected: {selectedUser.name} ({selectedUser.userId})
                </div>
              )}
            </div>

            {/* List of Teachers/Students */}
            <div>
              {user?.role === "student"
                ? user?.teachers?.map((teacher) => (
                    <div
                      key={teacher.teacherId}
                      className="py-3 px-2  w-full flex gap-4 mb-4 justify-between  shadow-slate-500 shadow-lg"
                    >
                      <h1>ID: {teacher.teacherId}</h1>
                      <h1>Name: {teacher.teacherName}</h1>
                      <button className="text-red-500 text-xl hover:scale-110">
                      <MdDelete />
                      </button>
                    </div>
                  ))
                : user?.students?.map((student) => (
                    <div
                      key={student.studentId}
                      className="py-3 px-2  w-full flex gap-4 mb-4 justify-between  shadow-slate-500 shadow-lg"
                    >
                      <h1>ID: {student.studentId}</h1>
                      <h1>Name: {student.studentName}</h1>
                      <button className="text-red-500 text-xl hover:scale-110">
                      <MdDelete />
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserDetails;
