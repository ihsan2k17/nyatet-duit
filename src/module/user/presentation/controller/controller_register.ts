import { NextRequest, NextResponse } from "next/server";
import UserRepository from "../../infrastructure/repository_user";
import { RegisterUserusecase } from "../../application/usecase.register_user";


export class RegisterController {
    private service: RegisterUserusecase;
    constructor() {
        const repo = new UserRepository();
        this.service = new RegisterUserusecase(repo)
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