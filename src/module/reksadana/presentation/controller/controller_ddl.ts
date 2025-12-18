import { BaseController } from "@/shared/base/controllers/controller.base";
import { DropdownlistReksadanaUsecase } from "../../application/usecase.dropdownlist_rd";
import ReksadanaRepository from "../../infrastructure/repository_reksadana";
import { NextRequest } from "next/server";
import { getUserFromHeaders } from "@/shared/utils/headerstoken";

export class ReksadanadDropdownListController extends BaseController {
    private _usecaseddl: DropdownlistReksadanaUsecase
    constructor () {
        super()
        const repo = new ReksadanaRepository()
        this._usecaseddl = new DropdownlistReksadanaUsecase(repo)
    }

    async DDLReksadanaJenisTrn() {
        return this.ExecuteController(() => 
            this._usecaseddl.DDLReksadanaJenisTrn()
        )
    }
    
    async DDLReksadanaRDN(req: NextRequest) {
        const {userid} = getUserFromHeaders(req)
        return this.ExecuteController(() => 
            this._usecaseddl.DDLReksadanaRDN(userid)
        )
    }

    async DDLReksadanaProduk(req:NextRequest) {
        const {userid} = getUserFromHeaders(req)
        return this.ExecuteController(() => 
            this._usecaseddl.DDLReksadanaProduk(userid)
        )
    }

    async DDLReksadanaPortfolio(req:NextRequest) {
        const {userid} = getUserFromHeaders(req)
        return this.ExecuteController(() => 
            this._usecaseddl.DDLReksadanaPortfolio(userid)
        )
    }
}