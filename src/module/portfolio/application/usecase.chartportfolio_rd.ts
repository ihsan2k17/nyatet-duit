import { Result } from "@/shared/types/result";
import { PortfolioRepository } from "../infrastructure/repository_portfolio";
import { chartDataReksadanaModelView, ChartReksadanaModelView } from "../domain/modelview_rd";

export class ChartPortfolioReksadanaUsecase {
    constructor (private repo: PortfolioRepository) {}

    async ChartData(iduser: number, username:string):Promise<Result<chartDataReksadanaModelView[]>>{
        try {
            const res = await this.repo.ChartPortfolio(iduser,username)
            if(res.length === 0) {
                return Result.error("Data Not Found")
            }
            const data = res as ChartReksadanaModelView[]
            const hasil: Record<string, chartDataReksadanaModelView> = {}
            for(let i=0; i < data?.length; i++) {
                const row = data[i]
                const groupKey =`${row.bulan}-${row.tahun}` 
                if(!hasil[groupKey]) {
                    hasil[groupKey] = {
                        bulan: row.bulan ?? 0,
                        tahun: row.tahun ?? 0
                    }                
                }
                const columnKey = row.portfolio ?? '-'
                hasil[groupKey][columnKey] = row.nominaluang ?? 0
            }
            const result = Object.values(hasil)
            return Result.success<chartDataReksadanaModelView[]>(result)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data Chart Error: '+ error;
            return Result.error(errorMessage);
        }
    }
}