import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request) {
  const reqBody = await request.json();
  const { email } = reqBody;
 

  try {
    const user = await User.findOne({email}).select("-password")
    
    const userId = user._id;
    
    await sendEmail({ email, emailType: "RESET", userId: userId });

    return NextResponse.json(
      { message: "Email Send Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
