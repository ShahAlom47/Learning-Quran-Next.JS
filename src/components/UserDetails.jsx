"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useGetUsersQuery } from "../Redux/RTKapi/userApi";

const UserDetails = ({ user }) => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery({
    userType: user?.role === "student" ? "teacher" : "student",
  });
  console.log(users, 'uuuuuu');

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  // 🔍 ফিল্টার করা ইউজার লিস্ট (সাজেশন)
  const filteredUsers =
    users?.data?.filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // ✅ নতুন শিক্ষক/শিক্ষার্থী যোগ করার ফাংশন
  const handleAddUser = () => {
    if (!selectedUser || !user?.userId) return;

    const addStudentPayload = {
      student: user?.userId, // যাকে যোগ করতে চাই
      teacher: selectedUser.userId, // যাকে যোগ করা হবে
      role: user?.role,
    };

    const addTeacherPayload = {
      teacher: user?.userId, // যাকে যোগ করতে চাই
      student: selectedUser.userId, // যাকে যোগ করা হবে
      role: user?.role,
    };

    console.log("Sending request to backend:", addStudentPayload,addTeacherPayload);

    // 🔴 এখানে API কল করবে (fetch / axios দিয়ে)
    // fetch("/api/addUser", { method: "POST", body: JSON.stringify(payload) })
  };

  return (
    <div className=" text-black my-10 p-4">
      <div className=" flex justify-between gap-4 border-b-2 px-3 border-black pb-5">
        <div>
          <div className="rounded-full w-12 h-12 overflow-hidden flex items-center">
            <Image
              src={user?.photoUrl}
              width={50}
              height={50}
              alt="user photo"
            />
          </div>
          <h1 className="text-xl font-bold">
            {user?.name} <span className=" text-sm">( {user?.role})</span>
          </h1>
        </div>
      </div>

      {user?.role === "student" || user?.role === "teacher" ? (
        <div className=" text-black border border-black p-2 my-5">
          <div className="flex justify-between gap-3 border-b border-black py-1 px-4">
            <h1 className="capitalize text-xl">{user?.role}s</h1>
            <button
              onClick={() => setOpenAdd(!openAdd)}
              className="btn-sm rounded-sm btn-outline border border-black text-black"
            >
              Add {user?.role === "student" ? "Teacher" : "Student"}
            </button>
          </div>

          {/* 🔹 ইনপুট ফিল্ড যেখানে নতুন শিক্ষক/স্টুডেন্ট যোগ করা হবে */}
          <div
            className={`p-3 border border-gray-300 rounded my-3 ${
              openAdd ? "block" : " hidden"
            } `}
          >
            <div className=" flex gap-3">
              <input
                type="text"
                placeholder={`Search ${
                  user?.role === "student" ? "Teacher" : "Student"
                } Name`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-1 border border-gray-400 rounded bg-gray-400"
              />
              <button
                onClick={handleAddUser}
                className=" px-4 py-2 bg-blue-500 text-white rounded  w-2/12"
              >
                Add
              </button>
            </div>

            {/* 🔍 সাজেশন দেখানো */}
            {searchTerm && (
              <ul className="border border-gray-400 rounded mt-2">
                {filteredUsers.map((u) => (
                  <li
                    key={u._id}
                    onClick={() => {
                      setSelectedUser(u);
                      setSearchTerm(u.userId);
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {u.name} -- {u?.userId}
                  </li>
                ))}
              </ul>
            )}

            {/* ✅ ইনপুট ফিল্ড যেখানে সিলেক্টেড Teacher/Student এর ID থাকবে */}
            {selectedUser && (
              <div className="mt-2 text-sm text-gray-700">
                Selected: {selectedUser.name} ({selectedUser.id})
              </div>
            )}

            {/* 🔘 "Add" বোতাম */}
          </div>

          {/* 🔹 শিক্ষকদের / শিক্ষার্থীদের তালিকা */}
          <div className="">
            {user?.role === "student"
              ? user?.teachers?.map((teacher) => (
                  <div key={teacher._id}>{teacher.name}</div>
                ))
              : user?.students?.map((student) => (
                  <div key={student._id}>{student.name}</div>
                ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserDetails;
