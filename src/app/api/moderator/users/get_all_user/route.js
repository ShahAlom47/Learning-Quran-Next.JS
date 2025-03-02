import { getUserCollection } from "@/src/lib/database/db_collections";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userCollection = await getUserCollection(); // Ensure it's awaited if it's an async function
    const result = await userCollection.find().toArray(); // ✅ Fixed `.toArry` → `.toArray()`
    
    return NextResponse.json({ message: "Users retrieved successfully", data: result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
