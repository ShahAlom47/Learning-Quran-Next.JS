import { getUserCollection } from "@/src/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { userId } = req.params;

    const userCollection = await getUserCollection();

    const user = await userCollection
      .find({ userId: new ObjectId(userId) }) // Make sure userId is an ObjectId
      .toArray(); // Convert the cursor to an array

    // If no user found
    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({
      message: "User retrieved successfully",
      data: user[0], // Return only the first user if there are multiple matches
    });
  } catch (error) {
    // Handle server error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
