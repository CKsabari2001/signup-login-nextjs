import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenData {
  id: string;
  email: string;
  userName: string;
}

export function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("tokens")?.value || "";

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as TokenData;

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
