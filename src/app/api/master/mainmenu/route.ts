import { AuthValidate } from "@/libs/authtoken"
import { MasterMenuController } from "@/module/master/presentation/controller/controller_mastermenu"

import { NextRequest, NextResponse } from "next/server"


const controller = new MasterMenuController()

export async function GET(req:NextRequest) {
    // const Auth = ValidateToken()
    // if(Auth instanceof NextResponse) return Auth
    const user = await AuthValidate(req)
    if(!user?.userid) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    return controller.listData()
}
