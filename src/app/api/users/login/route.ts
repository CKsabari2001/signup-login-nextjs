import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    let { email, passWord } = reqBody;
    email = email.toLowerCase();

    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const isPassWordCorrect = await bcryptjs.compare(passWord, user.passWord);
    if (!isPassWordCorrect) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    // Create a Token Data
    const tokenData = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };

    // Create a Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login was successful",
      success: true,
    });
    // Send the token to the User Cookie
    response.cookies.set("tokens", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
