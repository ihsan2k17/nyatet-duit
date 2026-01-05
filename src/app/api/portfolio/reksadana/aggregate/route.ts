import { AuthValidate } from "@/libs/authtoken";
import { ReksadanaController } from "@/module/portfolio/presentation/controller/controller.datalist_rd";
import { NextRequest, NextResponse } from "next/server";

const controller = new ReksadanaController();
export async function GET(req:NextRequest) {
    
    const user = await AuthValidate(req)
        if(!user?.userid) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
    return controller.ReksadanaAggregate(user.userid);
}