import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

 connect();
export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;
    console.log(reqbody);

    const userfound = await User.findOne({ email });

    if (!userfound) {
      return NextResponse.json({ error: "User Not Found" }, { status: 400 });
    }

    const validatepassword = await bcryptjs.compare(password,userfound.password);

    if(!validatepassword){
        return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    //generate and send a jwt token

    const tokendata = {
        id: userfound._id,
        username: userfound.username,
        email: userfound.email
    }

    const token = jwt.sign(tokendata,process.env.JWT_SECRET_KEY,{expiresIn: "1d"}) 

    const response = NextResponse.json({
        message: "Login Successful",
        success: true
    })

    response.cookies.set("token",token,{httpOnly:true,path:"/"})

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
