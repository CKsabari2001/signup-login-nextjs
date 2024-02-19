import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import sendEMail from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user } = reqBody;

    const isVerified = user.isVerified;

    // if User is already verified
    if (isVerified) {
      return NextResponse.json({
        message: "User is already verified",
        success: true,
      });
    }

    // Send Verification Email
    await sendEMail({
      email: user.email,
      emailType: "VERIFICATION",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Verification Email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
