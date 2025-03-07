import { getUserCollection } from "@/src/lib/database/db_collections";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required", data: null },
        { status: 400 }
      );
    }

    const userCollection = await getUserCollection();
    const user = await userCollection.findOne({ userId: userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found", data: null }
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
