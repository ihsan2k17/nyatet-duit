import { Result } from "@/shared/types/result";
import { PortfolioRepository } from "../infrastructure/repository_portfolio";
import { chartDataReksadanaModelView } from "../domain/modelview_rd";
import { EntityReksadanaPortfolioCharts } from "../domain/entity_rd.chart";

export class ChartPortfolioReksadanaUsecase {
    constructor (private repo: PortfolioRepository) {}

    async ChartData(iduser: number, username:string):Promise<Result<chartDataReksadanaModelView[]>>{
        try {
            const res = await this.repo.ChartPortfolio(iduser,username)
            if(res.length === 0) {
                return Result.error("Data Not Found")
            }
            const hasil: Record<string, EntityReksadanaPortfolioCharts> = {}
            for(let i=0; i < res?.length; i++) {
                const row = res[i]
                const groupKey =`${row.bulan}-${row.tahun}` 

                if(!hasil[groupKey]) {
                    hasil[groupKey] = new EntityReksadanaPortfolioCharts (
                        row.bulan!,
                        row.tahun!,
                        {}
                    )                
                }
                
                hasil[groupKey].key[row.portfolio!] = 
                    (hasil[groupKey].key[row.portfolio!] ?? 0) + row.nominal_uang!
            }
            const result:chartDataReksadanaModelView[] = Object.values(hasil).map(e => ({
                bulan:e.bulan,
                tahun:e.tahun,
                ...e.key
            }))
            return Result.success<chartDataReksadanaModelView[]>(result)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data Chart Error: '+ error;
            return Result.error(errorMessage);
        }
    }
}