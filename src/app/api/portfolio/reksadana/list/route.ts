import { ReksadanaDatalistController } from "@/module/reksadana/presentation/controller/controller_datalist";
import { NextRequest } from "next/server";

const controller = new ReksadanaDatalistController();
export async function GET(req:NextRequest) {
    return controller.ListData(req);
}