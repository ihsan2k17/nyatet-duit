import { PortfolioController } from "@/module/reksadana/presentation/controller/controller_portfolio";
import { NextRequest } from "next/server";

const controller = new PortfolioController();
export async function POST(req: NextRequest) {
    return controller.Chart(req);
}