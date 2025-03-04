import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserCollection } from "@/src/lib/database/db_collections";

export const POST = async (req) => {
  try {
    const usersCollection = await getUserCollection();
    const body = await req.json();
    const { userId, email, password, role, photoUrl } = body;

    if (!email || !password || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email or userId already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { userId }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or User ID already exists Please Check Your Email and Try Again" },
        { status: 409 }
      );
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user with hashed password
    const result = await usersCollection.insertOne({
      userId,
      email,
      name: body.name,
      password: hashedPassword,
      role,
      photoUrl,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export default POST;
