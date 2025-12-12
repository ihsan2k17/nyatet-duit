import { LoginController } from "@/module/user/presentation/controller/controller_login";
import { NextRequest } from "next/server";

const controller = new LoginController();
export async function POST(req: NextRequest) {
    return controller.Login(req);
}