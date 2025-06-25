  import { connect } from "@/dbConfig/dbConfig.js";
  import User from "@/models/userModels";
  import { NextRequest, NextResponse } from "next/server";
  import bcryptjs from "bcryptjs";

  
  export async function POST(request) {
    await connect();
    try {
      const reqbody = await request.json();

      const { username, email, password } = reqbody;
      console.log(reqbody);

      //check if user already exists

      const user = await User.findOne({ email });

      if (user) {
        return NextResponse.json(
          { error: "User Already Exists" },
          {
            status: 400,
          }
        );
      }

      //Hash Password

      const salt = await bcryptjs.genSalt(10);
      const hashed_password = await bcryptjs.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashed_password,
      });

      const savedUser = await newUser.save();
      console.log(savedUser);

      return NextResponse.json({
        message: "User Created Successfully",
        success: true,
        savedUser,
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
