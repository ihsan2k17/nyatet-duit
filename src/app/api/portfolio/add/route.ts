import { ValidateToken } from "@/libs/authtoken";
import { PortfolioController } from "@/module/reksadana/presentation/controller/controller_portfolio";
import { NextRequest, NextResponse } from "next/server";

const controller = new PortfolioController();
export async function POST(req: NextRequest) {
    const Auth = ValidateToken(req)
    if(Auth instanceof NextResponse) return Auth
    return controller.AddPortfolio(req);
}