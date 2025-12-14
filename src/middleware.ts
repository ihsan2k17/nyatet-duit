import { NextRequest, NextResponse } from "next/server";
import { getProtectedRoutes } from "./libs/database/protectedroutescache";
import jwt from "jsonwebtoken"
import { TokenPayload } from "./shared/types/token.payloads";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
    const path = req.nextUrl.pathname
    const protectedRoutes = getProtectedRoutes()
    const isProtected = protectedRoutes.some(r => path.startsWith(r))
    if(!isProtected){
        return NextResponse.next()
    }
    if(!token) {
        return NextResponse.redirect(new URL("/login",req.url))
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
        const headers = new Headers(req.headers)
        headers.set("x-userid",payload.userid.toString())
        headers.set("x-username", payload.username)
        headers.set("x-name", payload.name)
        headers.set("x-isonline", String(payload.isonline).toString())
        return NextResponse.next({request:  {headers}})
    } catch {
        return NextResponse.redirect(new URL("/login", req.url))
    }
}