import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { TokenPayload } from "../types/token.payloads";

export interface CookieToken {
    userid: number,
    username: string,
    name: string
}

export function GetUserFormCookie(req: NextRequest):CookieToken|null {
    const token = req.cookies.get(process.env.TOKEN_LOGIN || "auuuuuu")?.value
    if(!token) {
        return null
    }
    const data = jwt.decode(token) as TokenPayload | null

    if(!data?.userid || !data?.username || !data?.name){
        return null;
    }
    return {
        username: data.username,
        userid: data.userid,
        name: data.name
    }
}