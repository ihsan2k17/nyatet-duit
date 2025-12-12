import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../../application/service_user";
import UserRepository from "../../infrastructure/repository_user";


export class RegisterController {
    private service: UserService;
    constructor() {
        const repo = new UserRepository();
        this.service = new UserService(repo)
    }

    async Register(req:NextRequest) {
        const {Username, Password, Name, Email} = await req.json()
        try {
            const result = await this.service.Register(Username,Password,Name, Email);
            return NextResponse.json(result, {
                status: result.status ? 201 : 401
            })
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
}