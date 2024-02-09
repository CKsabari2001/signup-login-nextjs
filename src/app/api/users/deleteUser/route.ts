import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user } = reqBody;

    // find if user if there
    const userFound = await User.findOne({ _id: user._id });

    if (!userFound) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Delete the user
    await User.deleteOne({ _id: user._id });

    const response = NextResponse.json({
      message: "User deleted successfully",
      success: true,
    });

    // Deleting the user Cookies
    response.cookies.set("tokens", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
