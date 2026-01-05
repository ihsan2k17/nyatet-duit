import { BaseController } from "@/shared/base/controllers/controller.base";
import { GetDataListReksadanaUsecase } from "../../application/usecase.getdatalist_rd";
import ReksadanaRepository from "../../infrastructure/repository_reksadana";
import { NextResponse } from "next/server";

export class ReksadanaDatalistController extends BaseController {
    private _usecase: GetDataListReksadanaUsecase

    constructor() {
        super()
        const repo = new ReksadanaRepository()
        this._usecase = new GetDataListReksadanaUsecase(repo)
    }

    async ListData(userid: number) {
        if(!userid) {
            return NextResponse.json({ message: "Unauthorized: Missing user headers" },{status:400});
        }

        return this.ExecuteController(() => {
            return this._usecase.getdata(userid)
        })
    }
}