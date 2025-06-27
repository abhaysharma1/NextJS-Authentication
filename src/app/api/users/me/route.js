import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";


connect()

export async function GET(request){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({message: "User Found", data: user})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({error: error.message},{status: 400})
    }
}