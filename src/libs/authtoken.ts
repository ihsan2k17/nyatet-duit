import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { TokenPayload } from "@/shared/types/token.payloads";

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

export async function AuthValidate(req: NextRequest):Promise<TokenPayload|null> {
    let token: string | null = null;

    // 1️⃣ Bearer (mobile / api)
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice(7);
    }

    // 2️⃣ Cookie (web)
    if (!token) {
        token = req.cookies
            .get(process.env.TOKEN_LOGIN || "auuuuuu")
            ?.value ?? null;
    }

    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    } catch {
        return null;
    }
}