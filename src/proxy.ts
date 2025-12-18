import { NextRequest, NextResponse } from "next/server";
import { getProtectedRoutes } from "./libs/database/protectedroutescache";
import { VerifyToken } from "./shared/utils/verifytoken";

export async function proxy(req:NextRequest) {
    const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
    const path = req.nextUrl.pathname
    const protectedRoutes = getProtectedRoutes()
    const isProtected = protectedRoutes.some(r => path.startsWith(r))
    if(!isProtected){
        return NextResponse.next()
    }
    if(!token || token.trim() === "") {
        return NextResponse.redirect(new URL("/login",req.url))
    }
    try {
        const payload = VerifyToken(token)

        const headers = new Headers(req.headers)
        headers.set("x-userid",payload.userid.toString())
        headers.set("x-username", payload.username)
        headers.set("x-name", payload.name)
        headers.set("x-isonline", String(payload.isonline))
        
        return NextResponse.next({request:  {headers}})
    } catch {
        return NextResponse.redirect(new URL("/login", req.url))
    }
}