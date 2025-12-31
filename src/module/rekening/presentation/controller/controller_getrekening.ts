import { NextRequest } from "next/server";
import { GetRekeningUsecase } from "../../application/usecase.get.rekening";
import { RekeningRepository } from "../../infrastructure/repository_rekening";
import { getUserFromHeaders } from "@/shared/utils/headerstoken";
import { BaseController } from "@/shared/base/controllers/controller.base";

export class RekeningGetDataController extends BaseController{
    private _usecase: GetRekeningUsecase
    constructor() {
        super()
        const repo = new RekeningRepository()
        this._usecase = new GetRekeningUsecase(repo)
    }

    async ReadAllRekening(req: NextRequest) {
        const {userid} = getUserFromHeaders(req)
        return this.ExecuteController(() => {
            return this._usecase.execute(userid!)
        })
    }
}