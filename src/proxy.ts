import { NextRequest, NextResponse } from "next/server";
import { getProtectedRoutes } from "./libs/database/protectedroutescache";
import { TokenPayload } from "./shared/types/token.payloads";
import jwt from "jsonwebtoken"

export async function proxy(req:NextRequest) {
    const path = req.nextUrl.pathname;
    const protectedRoutes = await getProtectedRoutes();
    
    // ambil token dari cookie
    const token = req.cookies.get(process.env.TOKEN_LOGIN || "auuuuuu")?.value
    const SECRET_KEY = process.env.JWT_SECRET || "secret123";
    const isProtected = protectedRoutes.some(r => path.startsWith(r));
    if (!isProtected) {
        return NextResponse.next();
    }

    if (!token) {
        if(path.startsWith("/api")) {
            return NextResponse.json({success:false, message: "Unauthorized"},{status:401})
        }
        return NextResponse.redirect(new URL("/login",req.url))
    }
    const dataToken = jwt.verify(token!, SECRET_KEY) as TokenPayload | null
    //console.log("proxy userid: ",dataToken!.userid)
    if (!dataToken?.userid) {
        return NextResponse.json({ success:false, message:"Unauthorized" }, {status:401});
    }

    // opsional: set header
    const headers = new Headers(req.headers);
    headers.set("x-userid", String(dataToken!.userid!));
    headers.set("x-username", dataToken!.username!);
    headers.set("x-name", dataToken!.name!);
    headers.set("x-isonline", String(dataToken!.isonline));
    
    return NextResponse.next({ request: { headers } });
}