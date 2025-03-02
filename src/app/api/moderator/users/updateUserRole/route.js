import { getUserCollection } from "@/src/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  try {
    const { userId, newRole } = await req.json();
    console.log("Received:", userId, newRole);

    const userCollection = await getUserCollection();

    // Check if user exists
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Prevent updating with the same role
    if (user.role === newRole) {
      return NextResponse.json(
        { message: "User already has this role" },
        { status: 400 }
      );
    }

    // Update the user role
    const updatedUser = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole } },
      { writeConcern: { w: "majority" } } // Ensure proper update
    );

    console.log("Update result:", updatedUser);
    if (updatedUser.modifiedCount === 0) {
      return NextResponse.json({ message: "No changes made" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "User role updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update user role", error: error.message },
      { status: 500 }
    );
  }
};
