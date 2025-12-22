import { NextRequest, NextResponse } from "next/server";
import UserRepository from "../../infrastructure/repository_user";
import jwt from "jsonwebtoken";
import { LoginUserusecase } from "../../application/usecase.login_user";
import { GoogleLoginUserusecase } from "../../application/usecase.googlelogin_user";
import { TokenPayload } from "@/shared/types/token.payloads";
import axios from "axios";

const SECRET_KEY = process.env.JWT_SECRET || "secret123";
export class LoginController {
    private loginUseCase: LoginUserusecase;
    private LoginGoogleUseCase: GoogleLoginUserusecase;

    constructor() {
        const repo = new UserRepository();
        this.loginUseCase = new LoginUserusecase(repo)
        this.LoginGoogleUseCase = new GoogleLoginUserusecase(repo)
    }
    async Login(req:NextRequest) {
        const body = await req.json()
        const {Username, Password} = body
        try {
            const result = await this.loginUseCase.Login(Username, Password);
            if(result.status === false) {
                return NextResponse.json({message: result.message}, {status:400})
            }
            if(!result.data) {
                return NextResponse.json({message:"Data Not Found"},{status:404})
            }
            const datauser:TokenPayload = result.data 
            const token = jwt.sign(
                {
                    userid: datauser.userid, 
                    username: datauser.username, 
                    name: datauser.name, 
                    isonline: datauser.isonline 
    
                }, SECRET_KEY, { expiresIn:"1d"}
            )
            const resbody = {
                status: result.status,
                message: result.message,
                token:token,
                data: datauser
            }
            const token_name = process.env.TOKEN_LOGIN || "auuuuuu"
            const res = NextResponse.json(resbody,{status:200})
            res.cookies.set(token_name, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60, // 1 jam
            });
            return res;
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
    async LoginWithGoogle(req: NextRequest) {
        //const {Username, Name, Email} = await req.json()
        const {code} = await req.json()
        if(!code) {
            return NextResponse.json(
                {message: "Google Auth code missing"},
                {status: 400}
            )
        }
        try {
            const tokenRes = await axios.post("https://oauth2.googleapis.com/token", new URLSearchParams({
                code:code,
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                grant_type:"authorization_code",
            }).toString(),{
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            })
            const accessToken = tokenRes.data.access_token
            const infoRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
                headers: {
                    Authorization:`Bearer ${accessToken}`
                }
            })

            const email = infoRes.data.email
            const name = infoRes.data.name
            const result = await this.LoginGoogleUseCase.CekGoogle(email,name,email)
            if(result.status === false) {
                return NextResponse.json({message: result.message}, {status:400})
            } else if (!result.data) {
                return NextResponse.json({message:"Data Not Found"},{status:404})
            }
            const datauser:TokenPayload = result.data 
            const token = jwt.sign(
                {
                    userid: datauser.userid, 
                    username: datauser.username, 
                    name: datauser.name, 
                    isonline: datauser.isonline 
    
                }, SECRET_KEY, { expiresIn:"1d"}
            )
            const resbody = {
                status: result.status,
                message: result.message,
                token:token,
                data: datauser
            }
            const token_name = process.env.TOKEN_LOGIN || "auuuuuu"
            const res = NextResponse.json(resbody,{status:200})
            res.cookies.set(token_name, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60, // 1 jam
            });
            return res;
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
}
