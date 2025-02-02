
// import connectDB from "@/lib/connectDB"
import { NextResponse } from "next/server"
// import { NextResponse } from "next/server"


export const GET = async () => {

    try {
        // const res = await servicesCollection.find().toArray()
        return NextResponse.json('user paice ')
    }
    catch (error) {

        
        return NextResponse.json(error)
    }
}
