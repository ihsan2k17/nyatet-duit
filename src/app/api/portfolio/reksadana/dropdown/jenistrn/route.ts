import { ReksadanadDropdownListController } from "@/module/reksadana/presentation/controller/controller_ddl";

const controller = new ReksadanadDropdownListController();
export async function GET() {
    return controller.DDLReksadanaJenisTrn();
}