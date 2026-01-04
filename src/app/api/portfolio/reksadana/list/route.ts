import { AuthValidate } from "@/libs/authtoken";
import { ReksadanaDatalistController } from "@/module/portfolio/presentation/controller/controller_datalist";
import { NextRequest, NextResponse } from "next/server";

const controller = new ReksadanaDatalistController();
export async function GET(req:NextRequest) {
    
    const user = await AuthValidate(req)
        if(!user?.userid) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
    return controller.ListData(user.userid);
}