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

    // Update the user role and add the respective array
    const updateData = { $set: { role: newRole } };

    if (newRole === "teacher" && !user.students) {
      updateData.$set.students = []; // Add "students" array if the user is a teacher
    } else if (newRole === "student" && !user.teachers) {
      updateData.$set.teachers = []; // Add "teachers" array if the user is a student
    }

    // Update the user with the new role and the array
    await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      updateData
    );

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
