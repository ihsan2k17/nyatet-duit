import { AuthValidate } from "@/libs/authtoken";
import { RekeningGetDataController } from "@/module/rekening/presentation/controller/controller_getrekening";
import { NextRequest, NextResponse } from "next/server";

const controller = new RekeningGetDataController();
export async function GET(req:NextRequest) {
    const user = await AuthValidate(req)
    if(!user?.userid) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    return await controller.ReadAllRekening(user.userid);
}