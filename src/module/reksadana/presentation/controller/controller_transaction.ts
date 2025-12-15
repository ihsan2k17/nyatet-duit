import { NextRequest } from "next/server";
import { BuyTransactionReksadanaUsecase } from "../../application/usecase.buytransaction_rd";
import { SellTransactionReksadanaUsecase } from "../../application/usecase.selltransaction_rd";
import ReksadanaRepository from "../../infrastructure/repository_reksadana";
import { getUserFromHeaders } from "@/shared/utils/headerstoken";
import { RDTransactionModel } from "../../domain/model_rd_transaction";
import { BaseController } from "@/shared/base/controllers/controller.base";

export class ReksadanaTransactionController extends BaseController {
    private _BuyUseCase: BuyTransactionReksadanaUsecase
    private _SellUseCase: SellTransactionReksadanaUsecase

    constructor () {
        super()
        const repo = new ReksadanaRepository()
        this._BuyUseCase = new BuyTransactionReksadanaUsecase(repo)
        this._SellUseCase = new SellTransactionReksadanaUsecase(repo)
    }

    async buyTransaction(req:NextRequest) {
        const {userid} = getUserFromHeaders(req)
        const body = await req.json()
        const dto: RDTransactionModel = {
            nominaluang: body.nominaluang,
            nav: body.nav,
            jumlahunit: body.jumlahunit,
            jenistrn: body.jenistrn,
            rdnid: body.rdnid,
            rdprodukid: body.rdprodukid,
            tanggal: body.tanggal,
            tahun: body.tahun,
            norekrdn: body.norekrdn,
            portfolio: body.portfolio,
            type: body.type,
            idportfolio: body.idportfolio,
            iduser: userid
        }
        return this.ExecuteController(() => 
            this._BuyUseCase.Execute(dto)
        )
    }
    async SellTransaction(req: NextRequest) {
        const {userid} = getUserFromHeaders(req)
        const body = await req.json()
        const dto: RDTransactionModel = {
            nominaluang: body.nominaluang,
            nav: body.nav,
            jumlahunit: body.jumlahunit,
            jenistrn: body.jenistrn,
            rdnid: body.rdnid,
            rdprodukid: body.rdprodukid,
            tanggal: body.tanggal,
            tahun: body.tahun,
            norekrdn: body.norekrdn,
            portfolio: body.portfolio,
            type: body.type,
            idportfolio: body.idportfolio,
            iduser: userid
        }
        return this.ExecuteController(() => 
            this._SellUseCase.Execute(dto)
        )
    }
}