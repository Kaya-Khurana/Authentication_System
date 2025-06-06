import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword, // Save hashed password
    });

    await newUser.save();

    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: newUser,
    });
  } catch (error: any) {
    console.log("Signup Error:", error); // <--- This will show the real error in your terminal!
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
