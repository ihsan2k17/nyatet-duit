import { Result } from "@/shared/types/result"
import { RDPortfolioModel } from "../domain/model_rd_portfolio"
import { supabase } from "@/libs/database/configuration"
import { ChartReksadanaModelView } from "../domain/modelview_rd"

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

    async CheckNameRDPortfolio(iduser:number, namaportfolio:string):Promise<boolean> {
        const {data, error} = await supabase.rpc("lk_insert_rd_portfolio", {
            p_state:'CEKNAMAPORTFOLIO',
            p_iduser: iduser,
            p_namaportfolio: namaportfolio
        })
        if(error) {
            throw new Error(`${error.message ?? 'Unknown Supabase error'}`)
        }
        if(data == null) {
            return false
        } return true
    }

    async ListNameRDPortfolio(iduser: number): Promise<RDPortfolioModel[]> {
        const {data, error} = await supabase.rpc ("lk_insert_rd_portfolio",{
            p_state: 'LISTNAMAPORTFOLIO',
            p_iduser: iduser
        })
        if(error) {
            throw new Error(`${error.message ?? 'Unknown Supabase error'}`)
        }
        return data?.data ?? []
    }
    
    async ChartPortfolio(iduser:number, username: string): Promise<ChartReksadanaModelView[]> {
        const {data, error} = await supabase.rpc("lk_insert_rd_portfolio",{
            p_iduser: iduser,
            p_namaportfolio: null,
            p_totaluang: null,
            p_totalnav: null,
            p_totalunit: null,
            p_createby:null,
            p_updateby: null,
            p_username: username,
            p_state:'GETDATACHARTS'
        }) 
        if(error) {
            throw new Error(`${error.message ?? 'Unknown Supabase error'}`)
        }
        return data?.data ?? []
    }
}