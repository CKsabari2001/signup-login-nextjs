import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import sendEMail from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    let { email } = reqBody;
    email = email.toLowerCase();

    // Check if user already exists
    const user = await User.findOne({ email }).select("-passWord");

    // if User is not there return error
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Getting user ID
    const userId = user._id;

    // Sending email to user for password reset
    sendEMail({
      email,
      emailType: "PASSWORD_RESET",
      userId,
    });

    return NextResponse.json({
      message: "Email confirmation sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
