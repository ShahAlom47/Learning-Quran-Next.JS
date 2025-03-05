import { getUserCollection } from "@/src/lib/database/db_collections";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const userId = await req.query;

    const userCollection = await getUserCollection();

    console.log(userId,'idddddd');
    // Fetch the user by custom userId
    const user = await userCollection.findOne({ userID: userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};
