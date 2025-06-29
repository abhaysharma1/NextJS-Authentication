import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  const reqbody = await request.json();
  const { token, password } = reqbody;
  console.log(token,password)

  try {
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("User not found")
      return NextResponse.json({ message: "User Not Found" }, { status: 400 });
    }

    console.log(user);

    const salt = await bcryptjs.genSalt(10);
    const hashed_password = await bcryptjs.hash(password, salt);

    user.password = hashed_password;
    user.forgotPasswordToken = "";
    user.forgotPasswordExpiry = "";
    await user.save()

    return NextResponse.json(
      { message: "Password Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
