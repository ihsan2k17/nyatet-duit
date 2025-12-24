import { BaseController } from "@/shared/base/controllers/controller.base";
import { GetDataListReksadanaUsecase } from "../../application/usecase.getdatalist_rd";
import ReksadanaRepository from "../../infrastructure/repository_reksadana";
import { NextRequest } from "next/server";
import { getUserFromHeaders } from "@/shared/utils/headerstoken";

export class ReksadanaDatalistController extends BaseController {
    private _usecase: GetDataListReksadanaUsecase

    constructor() {
        super()
        const repo = new ReksadanaRepository()
        this._usecase = new GetDataListReksadanaUsecase(repo)
    }

    async ListData(req:NextRequest) {
        const {userid} = getUserFromHeaders(req)
        return this.ExecuteController(() => 
        this._usecase.getdata(userid!))
    }
}