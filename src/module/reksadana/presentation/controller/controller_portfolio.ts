import { NextRequest, NextResponse } from "next/server"
import { ChartPortfolioReksadanaUsecase } from "../../application/usecase.chartportfolio_rd"
import jwt from "jsonwebtoken"
import { PortfolioRepository } from "../../infrastructure/repository_portfolio"
import { TokenPayload } from "@/shared/types/token.payloads"


export class PortfolioController {

    private usecaseChart: ChartPortfolioReksadanaUsecase
    constructor () {
        const repo = new PortfolioRepository()
        this.usecaseChart = new ChartPortfolioReksadanaUsecase(repo)
    }

    async Chart(req:NextRequest) {
        const token = req.cookies.get(process.env.NEXT_TOKEN_LOGIN || "auuuuuu")?.value
        if(!token) {
            return NextResponse.json({ message: "User lu gak ada, penyusup!!" }, { status: 401 })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
            if(decoded.userid && decoded.username) {
                const res = await this.usecaseChart.ChartData(decoded.userid, decoded.username)
                if(res.status === false) {
                    return NextResponse.json({success: false, message:res.message},{status:404})
                }
                return NextResponse.json({res},{status:200})
            } 
        } catch (error: unknown) {
            return NextResponse.json({success: false, message: "internal Server Error, " + error},{status: 500})
        }
    }
}