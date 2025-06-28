import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModels";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if(!user){
        return NextResponse.json({error:"InavlidToken"},{status:400})
    }

    user.isVerified = true;
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()

    return NextResponse.json({message:"Email Verified", success:true},{status:200})

  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
