import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, passWord } = reqBody;

    // Hashing Password using bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPassWord = await bcryptjs.hash(passWord, salt);

    // find user using email address and update password field
    await User.findOneAndUpdate(
      { email },
      {
        passWord: hashedPassWord,
      }
    );

    return NextResponse.json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
