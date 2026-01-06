import { AuthValidate } from "@/libs/authtoken";
import { PortfolioController } from "@/module/portfolio/presentation/controller/controller_portfolio";
import { NextRequest, NextResponse } from "next/server";

const controller = new PortfolioController();
export async function GET(req: NextRequest) {
    
    const user = await AuthValidate(req)
    if(!user?.userid && !user?.username) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    return controller.Chart(user.userid!, user.username!);
}