import { NextRequest, NextResponse } from "next/server";
import UserRepository from "../../infrastructure/repository_user";
import jwt from "jsonwebtoken";
import { LoginUserusecase } from "../../application/usecase.login_user";
import { GoogleLoginUserusecase } from "../../application/usecase.googlelogin_user";

const SECRET_KEY = process.env.JWT_SECRET || "secret123";
const RANDOM_PASSWORD =process.env.NEXT_PUBLIC_GOOGLE_RANDOM_PASSWORD
export class LoginController {
    //private service: UserService;
    private loginUseCase: LoginUserusecase;
    private LoginGoogleUseCase: GoogleLoginUserusecase;

    constructor() {
        const repo = new UserRepository();
        //this.service = new UserService(repo);
        this.loginUseCase = new LoginUserusecase(repo)
        this.LoginGoogleUseCase = new GoogleLoginUserusecase(repo)
    }
    
    async Login(req: NextRequest) {
        const body = await req.json();
        const { Username, Password } = body;
        try {
            const result = await this.loginUseCase.Login(Username, Password);
            if(result.status === false) {
                return NextResponse.json({message: result.message}, {status:400})
            }
            const token = jwt.sign(
                {
                    id: result.data!.userid,
                    username: result.data!.username,
                    name: result.data!.name,
                    useractive : result.data!.useractive,
                    isonline: result.data!.isonline
    
                }, SECRET_KEY, { expiresIn:"1D"}
            )
            const resbody = {
                status: result.status,
                message: result.message,
                token:token,
                data: result.data
            }
            const token_name = process.env.NEXT_TOKEN_LOGIN || "auuuuuu"
            const clientPayload = {
                id: result.data!.userid,
                username: result.data!.username,
                name: result.data!.name,
            }
            const res = NextResponse.json(resbody,{status:200})
            res.cookies.set(token_name, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60, // 1 jam
            });
            
            res.cookies.set("user_info", JSON.stringify(clientPayload), {
                httpOnly: false,
                path: "/",
                sameSite: "strict",
            });
            return res;
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
    async LoginWithGoogle(req: NextRequest) {
        const {username, name, email} = await req.json()
        try {
            const result = await this.LoginGoogleUseCase.CekGoogle(username,RANDOM_PASSWORD,name,email)
            if(result.status === false) {
                return NextResponse.json({message: result.message}, {status:400})
            }
            const token = jwt.sign(
                {
                    id: result.data!.userid,
                    username: result.data!.username,
                    name: result.data!.name,
                    useractive : result.data!.useractive,
                    isonline: result.data!.isonline
    
                }, SECRET_KEY, { expiresIn:"1D"}
            )
            const resbody = {
                status: result.status,
                message: result.message,
                token:token,
                data: result.data
            }
            const token_name = process.env.NEXT_TOKEN_LOGIN || "auuuuuu"
            const clientPayload = {
                id: result.data!.userid,
                username: result.data!.username,
                name: result.data!.name,
            }
            const res = NextResponse.json(resbody,{status:200})
            res.cookies.set(token_name, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60, // 1 jam
            });
            
            res.cookies.set("user_info", JSON.stringify(clientPayload), {
                httpOnly: false,
                path: "/",
                sameSite: "strict",
            });
            return res;
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
}
