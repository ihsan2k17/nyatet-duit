import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || 'secret123';
export async function ValidateToken() {
    const tokenName = process.env.TOKEN_LOGIN || "auuuuuu"
    const cookiesStore = await cookies()
    const token = cookiesStore.get(tokenName)?.value

    if (!token) {
        return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
        )
    }
    try {
        return jwt.verify(token, secret)
    } catch (error: unknown) {
        return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 401})
    }
}