import { NextResponse } from "next/server";
import { GetRekeningUsecase } from "../../application/usecase.get.rekening";
import { RekeningRepository } from "../../infrastructure/repository_rekening";
import { BaseController } from "@/shared/base/controllers/controller.base";

export class RekeningGetDataController extends BaseController{
    private _usecase: GetRekeningUsecase
    constructor() {
        super()
        const repo = new RekeningRepository()
        this._usecase = new GetRekeningUsecase(repo)
    }

    async ReadAllRekening(userid: number) {
        if(!userid) {
            return NextResponse.json({ message: "Unauthorized: Missing user headers" },{status:400});
        }
        
        return this.ExecuteController(() => {
            return this._usecase.execute(userid)
        })
    }
}