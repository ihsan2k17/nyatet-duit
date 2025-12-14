import { NextRequest } from "next/server";
import { HeaderToken } from "../types/headerstoken.user";

export function getUserFromHeaders (req:NextRequest) :HeaderToken {
    const userid = req.headers.get("x-userid")
    const username = req.headers.get("x-username")
    const name = req.headers.get("x-name")
    const isonline = req.headers.get("x-isonline")

    if(!userid || !username || !name || !isonline) {
        throw new Error("Unauthorized: Missing user headers")
    }
    return {
        userid: Number(userid),
        username: username,
        name: name,
        isonline: Boolean(isonline)
    }
}