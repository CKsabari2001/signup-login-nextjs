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
      verificationToken: token,
      verificationExpiry: { $gt: Date.now() },
    });

    // If user is not there
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "User verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
