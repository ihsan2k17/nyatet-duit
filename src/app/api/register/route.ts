import { RegisterController } from "@/module/user/presentation/controller/controller_register";
import { NextRequest } from "next/server";

const controller = new RegisterController();

export async function POST(req:NextRequest) {
    return controller.Register(req);
}