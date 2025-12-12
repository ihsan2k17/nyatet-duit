import { LoginController } from "@/module/user/presentation/controller/controller_login";
import { NextRequest } from "next/server";

const controller = new LoginController();
export const POST = async (req: NextRequest) => {
    return await controller.LoginWithGoogle(req);
}