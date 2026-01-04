import { ReksadanadDropdownListController } from "@/module/portfolio/presentation/controller/controller_ddl";
import { NextRequest } from "next/server";

const controller = new ReksadanadDropdownListController();
export async function GET(req:NextRequest) {
    return controller.DDLReksadanaRDN(req);
}