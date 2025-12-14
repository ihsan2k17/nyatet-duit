import { NextRequest, NextResponse } from "next/server"
import { ChartPortfolioReksadanaUsecase } from "../../application/usecase.chartportfolio_rd"
import { PortfolioRepository } from "../../infrastructure/repository_portfolio"
import { getUserFromHeaders } from "@/shared/utils/headerstoken"
import { AddPortfolioReksadanaUsecase } from "../../application/usecase.addportfolio_rd"
import { RDPortfolioModel } from "../../domain/model_rd_portfolio"


export class PortfolioController {

    private usecaseChart: ChartPortfolioReksadanaUsecase
    private usecasePortfolio: AddPortfolioReksadanaUsecase
    constructor () {
        const repo = new PortfolioRepository()
        this.usecaseChart = new ChartPortfolioReksadanaUsecase(repo)
        this.usecasePortfolio = new AddPortfolioReksadanaUsecase(repo)
    }

    async Chart(req:NextRequest) {
        const {userid, username} = getUserFromHeaders(req)
        try {
            const res = await this.usecaseChart.ChartData(userid, username)
            if(res.status === false) {
                return NextResponse.json({success: false, message:res.message},{status:404})
            }
            return NextResponse.json({res},{status:200})
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }

    async AddPortfolio(req:NextRequest) {
        const {namaportfolio, totaluang, totalnav, totalunit} = await req.json()
        const {userid, username} =  getUserFromHeaders(req)
        try{
            const created = username
            const updated = username
            const dto: RDPortfolioModel = {
                iduser: userid, 
                namaportfolio: namaportfolio, 
                totaluang: totaluang,
                totalnav: totalnav, 
                totalunit: totalunit, 
                createby: created, 
                updateby: updated
            }
            const res = await this.usecasePortfolio.execute(dto)
            if(res.status === false) {
                return NextResponse.json({success:true, message: res.message},{status: 201})
            }
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
}