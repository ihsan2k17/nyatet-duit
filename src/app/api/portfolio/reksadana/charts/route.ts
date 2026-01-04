import { PortfolioController } from "@/module/portfolio/presentation/controller/controller_portfolio";
import { NextRequest } from "next/server";

const controller = new PortfolioController();
export async function GET(req: NextRequest) {
    return controller.Chart(req);
}