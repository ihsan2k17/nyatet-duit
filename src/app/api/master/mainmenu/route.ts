import { ValidateToken } from "@/libs/authtoken"
import { MasterMenuController } from "@/module/master/presentation/controller/controller_mastermenu"
import { NextResponse } from "next/server"


const controller = new MasterMenuController()

export async function GET() {
    const Auth = ValidateToken()
    if(Auth instanceof NextResponse) return Auth
    return controller.listData()
}
