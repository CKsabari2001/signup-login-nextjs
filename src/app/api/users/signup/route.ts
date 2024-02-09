import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEMail from "@/helpers/mailer";

connect();

interface RegisterBody {
  userName: string;
  email: string;
  passWord: string;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody: RegisterBody = await request.json();
    let { userName, email, passWord } = reqBody;
    email = email.toLowerCase();

    // // Check if user email already exists
    const isUserEmail = await User.findOne({ email });
    if (isUserEmail) {
      return NextResponse.json(
        { error: "User email already exists" },
        { status: 400 }
      );
    }

    // // Check if user name already exists
    const isUserName = await User.findOne({ userName });
    if (isUserName) {
      return NextResponse.json(
        { error: "User name already exists" },
        { status: 400 }
      );
    }

    // Ashing Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassWord = await bcryptjs.hash(passWord, salt);

    const newUser = new User({
      userName,
      email,
      passWord: hashedPassWord,
    });

    await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
