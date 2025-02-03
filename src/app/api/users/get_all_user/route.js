

import { NextResponse } from "next/server"


export const GET = async () => {

    try {
      
        return NextResponse.json('user paice ')
    }
    catch (error) {

        
        return NextResponse.json(error)
    }
}
