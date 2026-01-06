import { GetAllMasterMenuUseCase } from "../../application/usecase.mastermenu"
import { MenuRepository } from "../../infrastructure/repository_menu"
import { BaseController } from "@/shared/base/controllers/controller.base"
import { cachedMenu } from "../../infrastructure/cached.menu"

    export class MasterMenuController extends BaseController {
        private readonly usecase: GetAllMasterMenuUseCase

        constructor() {
            super()
            const repo = new MenuRepository()
            this.usecase = new GetAllMasterMenuUseCase(repo)
        }

        async listData(){

            return this.ExecuteController(() => {
                return cachedMenu(this.usecase)
            })
        }
    }
