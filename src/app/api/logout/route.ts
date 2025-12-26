import { ValidateToken } from "@/libs/authtoken";
import { LoginController } from "@/module/user/presentation/controller/controller_login";
import { NextRequest, NextResponse } from "next/server";

const controller = new LoginController();
export const POST = async (req: NextRequest) => {
    const Auth = ValidateToken()
    if(Auth instanceof NextResponse) return Auth
    return await controller.Logout(req);
}