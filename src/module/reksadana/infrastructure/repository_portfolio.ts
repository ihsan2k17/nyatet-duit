import { Result } from "@/shared/types/result"
import { RDPortfolioModel } from "../domain/model_rd_portfolio"
import { supabase } from "@/libs/database/configuration"

export class PortfolioRepository {
    async AddRDPortfolio(model: RDPortfolioModel): Promise<Result<void>> {
        try{
            const {data, error} = await supabase.rpc("lk_insert_rd_portfolio",{
                p_iduser: model.iduser,
                p_namaportfolio: model.namaportfolio,
                p_totaluang: model.totaluang,
                p_totalnav: model.totalnav,
                p_totalunit: model.totalunit,
                p_createby: model.createby,
                p_updateby: model.updateby,
                p_state: 'SAVERDPORTFOLIO'
            })
            if(error) {
                return Result.error(error.message)
            } else if (!data) {
                return Result.error(data.message)
            }   
            return Result.success()
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error(errorMessage)
        }
    }

    async ListNameRDPortfolio(iduser: number): Promise<Result<RDPortfolioModel>> {
        try {
            const {data, error} = await supabase.rpc ("lk_insert_rd_portfolio",{
                p_state: 'LISTNAMAPORTFOLIO',
                p_iduser: iduser
            })
            if(error){
                return Result.error<RDPortfolioModel>(error.message)
            }
            return Result.success<RDPortfolioModel>(data as RDPortfolioModel)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Internal Server Error'
            return Result.error(errorMessage)
        }
    }
    
}