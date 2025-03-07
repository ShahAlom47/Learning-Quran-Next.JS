import { getUserCollection } from "@/src/lib/database/db_collections";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  try {
    const { teacherId, teacherName, studentId, studentName, role } = await req.json();

    if (!teacherId || !teacherName || !studentId || !studentName || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const userCollection = await getUserCollection();
    let userId = role === "student" ? studentId : teacherId;
    let updateField = role === "student" ? "teachers" : "students";
    let newData =
      role === "student"
        ? { teacherId, teacherName }
        : { studentId, studentName };

    // Find the user
    const user = await userCollection.findOne({ userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if data already exists in array
    if (user[updateField]?.some((entry) => entry.teacherId === teacherId || entry.studentId === studentId)) {
      return NextResponse.json(
        { success: false, message: "Data already exists" },
        { status: 409 }
      );
    }

    // Update user document
    const updateResult = await userCollection.updateOne(
      { userId },
      { $push: { [updateField]: newData } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Failed to update user data" },
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "User updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to update user role" }),
      { status: 500 }
    );
  }
};
