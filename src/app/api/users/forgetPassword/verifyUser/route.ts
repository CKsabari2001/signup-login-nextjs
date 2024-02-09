import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // finder user by verification token and check if token is valid (2 conditions)
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    }).select("-passWord");

    // If user is not there
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "email verified successfully",
      success: true,
      email: user.email,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
