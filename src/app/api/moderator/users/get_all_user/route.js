import { getUserCollection } from "@/src/lib/database/db_collections";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";
    const userType = searchParams.get("userType") || "all"; // Get the userType from the query params

    const userCollection = await getUserCollection();

    // 🔎 Search filter (name, email, or user ID)
    const filter = {
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { userId: { $regex: search, $options: "i" } },
        ],
      }),
      // Add userType filter based on the 'userType' query parameter
      ...(userType !== "all" && { role: userType }), // Only filter by userType if it's not 'all'
    };

    // Count total users based on the filter
    const totalUsers = await userCollection.countDocuments(filter);

    // Pagination and search query
    const users = await userCollection
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      message: "Users retrieved successfully",
      data: users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
