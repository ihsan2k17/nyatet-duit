import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TokenPayload } from "./shared/types/token.payloads";
import { supabase } from "./libs/database/configuration";


export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // ambil token dari cookie
  const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
  const tokendecode = req.cookies.get(process.env.NEXT_TOKEN_DEC || "auuuuu0")?.value;

  // ambil route yang protected dari DB
  const { data: masterMenu } = await supabase
    .from('master_menu')
    .select('route')
    .eq("access", true)
    .eq('isacitve', 'active')
    .order('id', { ascending: true });

  const protectedRoutes = masterMenu?.map(m => m.route) || [];
  const isProtected = protectedRoutes.some(r => path.startsWith(r));

  if (!isProtected) {
    // route publik → lanjut
    return NextResponse.next();
  }

  if (!tokendecode) {
    // token nggak ada → redirect login
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // decode token, kalau invalid atau expired akan throw
    const decode = jwt.decode(tokendecode) as TokenPayload | null;
    const dataToken = jwt.decode(token!) as TokenPayload | null
    if(!token) {
      if(jwt.TokenExpiredError) {
        const res = await supabase.rpc("lk_user",{
          p_username: decode!.username
        })
        if(res.data[0].status === false) {
          const resp = NextResponse.redirect(new URL("/login", req.url))
          resp.cookies.delete(process.env.NEXT_TOKEN_DEC || "auuuuu0")
          return resp
        } else {
          const resp = NextResponse.redirect(new URL("/", req.url))
          resp.cookies.delete(process.env.NEXT_TOKEN_DEC || "auuuuu0")
          return resp
        }
      }
      const res = NextResponse.redirect(new URL("/login", req.url))
      res.cookies.delete(process.env.NEXT_TOKEN_LOGIN ||"auuuuuu")
      return res
    }
    // opsional: set header
    const headers = new Headers(req.headers);
    headers.set("x-userid", String(dataToken!.userid!));
    headers.set("x-username", dataToken!.username!);
    headers.set("x-name", dataToken!.name!);
    headers.set("x-isonline", String(dataToken!.isonline));
    
    return NextResponse.next({ request: { headers } });
}
