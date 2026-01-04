import { NextRequest } from "next/server"
import { ChartPortfolioReksadanaUsecase } from "../../application/usecase.chartportfolio_rd"
import { PortfolioRepository } from "../../infrastructure/repository_portfolio"
import { getUserFromHeaders } from "@/shared/utils/headerstoken"
import { AddPortfolioReksadanaUsecase } from "../../application/usecase.addportfolio_rd"
import { BaseController } from "@/shared/base/controllers/controller.base"
import { RDPortfolioModel } from "../../domain/model_rd_portfolio"


export class PortfolioController extends BaseController {

    private usecaseChart: ChartPortfolioReksadanaUsecase
    private usecasePortfolio: AddPortfolioReksadanaUsecase
    constructor () {
        super()
        const repo = new PortfolioRepository()
        this.usecaseChart = new ChartPortfolioReksadanaUsecase(repo)
        this.usecasePortfolio = new AddPortfolioReksadanaUsecase(repo)
    }

    async Chart(req:NextRequest) {
        const {userid, username} = getUserFromHeaders(req)
        return this.ExecuteController(() => 
            this.usecaseChart.ChartData(userid!,username!)
        )
    }
    async AddPortfolio(req: NextRequest) {
        const {namaportfolio, totaluang, totalnav, totalunit} = await req.json()
        const {userid, username} =  getUserFromHeaders(req)
        const dto: RDPortfolioModel = {
            iduser: userid, 
            namaportfolio: namaportfolio, 
            totaluang: totaluang,
            totalnav: totalnav, 
            totalunit: totalunit, 
            createby: username, 
            updateby: username
        }
        return this.ExecuteController(() => 
            this.usecasePortfolio.execute(dto)
        );
    }
}