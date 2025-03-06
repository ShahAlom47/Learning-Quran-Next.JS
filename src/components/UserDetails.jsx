import Image from "next/image";
import React from "react";

const UserDetails = ({ user }) => {
  console.log(user, "user");
  return (
    <div className=" text-black my-10 p-4">
      <div className=" flex justify-between gap-4 border-b-2 px-3 border-black pb-5">
        <div className=" ">
          <div className="  rounded-full w-12 h-12 bb  overflow-hidden flex  items-center">
            <Image
              src={user?.photoUrl}
              width={50}
              height={50}
              alt="user photo"
            ></Image>
          </div>
          <h1 className="text-xl  font-bold  ">
            {user?.name} <span className=" text-sm">( {user?.role})</span>
          </h1>
        </div>
        <div className=" flex gap-3 flex-wrap items-end text-black" >
            <button className=" btn btn-outline btn-sm rounded-sm  text-black ">Edit User</button>
            <button className=" btn btn-outline btn-sm rounded-sm  text-black ">Edit XYZ</button>

        </div>
      </div>
    </div>
  );
};

export default UserDetails;
