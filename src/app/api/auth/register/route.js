import { NextResponse } from "next/server";
import { getUserCollection } from "@/src/lib/database/db_collections";

export const POST = async (req) => {
    try {
        const usersCollection = await getUserCollection(); // Await করা হয়েছে

        const body = await req.json(); 
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Insert new user
        const result = await usersCollection.insertOne({ name, email, password });

        return NextResponse.json({ 
            message: "User registered successfully", 
            userId: result.insertedId 
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ 
            message: "Internal server error", 
            error: error.message 
        }, { status: 500 });
    }
};

export default POST;
