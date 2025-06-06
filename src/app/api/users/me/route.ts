import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";

connect();

export async function GET(request: NextRequest) {
  try {
    const currentUserId = await getDataFromToken(request);
    const user= await User.findOne({_id: currentUserId}).select("-password");
    return NextResponse.json({
      message: "User found successfully",
      data:user
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
