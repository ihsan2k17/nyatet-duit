import { Result } from "@/shared/types/result";
import { supabase } from "@/libs/database/configuration";
import { RawReksadana } from "../domain/modelview_rd";
import { RDTransactionModel } from "../domain/model_rd_transaction";
import { ModelViewDropdownList } from "@/shared/types/dropdown.list";

class ReksadanaRepository {
    async GetReksadana(userid: number): Promise<RawReksadana[]> {
        const {data, error} = await supabase.rpc("lk_reksadana", {
            puserid: userid,
            pusername:null,
            state: 'CEKDATA'
        })
        if(error) {
            throw new Error(`${error.message ?? 'Unknown Supabase error'}`)
        }
        
        return data?.data ?? []
    }

    async AddBuyReksadanaTrn(model: RDTransactionModel): Promise<Result<void>> {
        try {
            const {data, error} = await supabase.rpc("lk_insert_rd_buy",{
                p_rdnid: model.rdnid,
                p_jenistransrdid: model.jenistrn,
                p_produkrdid: model.rdprodukid ,
                p_id_user: model.iduser,
                p_tgl: model.tanggal,
                p_tahun: model.tahun,
                p_norekrdn: model.norekrdn,
                p_namaportfolio: model.portfolio,
                p_nominaluang: model.nominaluang ,
                p_nav: model.nav ,
                p_jumlahunit: model.jumlahunit,
                p_type: model.type ,
                p_id_portfolio: model.idportfolio
            })
            if(error) {
                return Result.error(error.message)
            } else if(!data || data.status !== "success") {
                return Result.error(data.message || "Transaction Failed")
            } 
            return Result.success()
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error(errorMessage)
        }
    }

    async AddSellReksadanaTrn(model: RDTransactionModel): Promise<Result<void>> {
        try {
            const {data, error} = await supabase.rpc("lk_insert_rd_sell",{
                p_rdnid: model.rdnid,
                p_jenistransrdid: model.jenistrn,
                p_produkrdid: model.rdprodukid ,
                p_id_user: model.iduser,
                p_tgl: model.tanggal,
                p_tahun: model.tahun,
                p_norekrdn: model.norekrdn,
                p_namaportfolio: model.portfolio,
                p_nominaluang: model.nominaluang ,
                p_nav: model.nav ,
                p_jumlahunit: model.jumlahunit,
                p_type: model.type ,
                p_id_portfolio: model.idportfolio
            })
            if(error) {
                return Result.error(error.message)
            } else if(!data || data.status !== "success") {
                return Result.error(data.message || "Transaction Failed")
            } 
            return Result.success()
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error(errorMessage)
        }
    }
    
    async DDLReksadanaJenisTrn(): Promise<Result<ModelViewDropdownList[]>>{
        try {
            const {data, error} = await supabase.rpc("lk_ddlinsert_rd_trans",{
                p_state: 'CEKRDJENISTRANS'
            })
            if(error) { 
                return Result.error(error.message)
            } else if(!data) {
                return Result.error("No Data List")
            } 
            return Result.success<ModelViewDropdownList[]>(data.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error(errorMessage)
        }
    }

    async DDLReksadanaRDN(userid: number): Promise<Result<ModelViewDropdownList[]>>{
        try {
            const {data, error} = await supabase.rpc("lk_ddlinsert_rd_trans",{
                p_id: userid,
                p_state: 'CEKMASTERREKRDN'
            })
            if(error) {
                return Result.error(error.message)
            } else if (!data) {
                return Result.error("No Data List")
            }
            return Result.success<ModelViewDropdownList[]>(data.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error(errorMessage)
        }
    }

    async DDLReksadanaProduk(iduser: number): Promise<Result<ModelViewDropdownList[]>>{
        try {
            const {data, error} = await supabase.rpc("lk_ddlinsert_rd_trans",{
                p_id: iduser,
                p_state: 'CEKPRODUKRD'
            })
            if(error) {
                return Result.error(error.message)
            } else if (!data) {
                return Result.error("No Data List")
            }
            return Result.success<ModelViewDropdownList[]>(data.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error(errorMessage)
        }
    }

    async DDLReksadanaPortfolio(id_user: number): Promise<Result<ModelViewDropdownList[]>>{
        try {
            const {data, error} = await supabase.rpc("lk_ddlinsert_rd_trans",{
                p_id: id_user,
                p_state: 'CEKRDPORTFOLIO'
            })
            if(error) {
                return Result.error(error.message)
            } else if (!data) {
                return Result.error("No Data List")
            }
            return Result.success<ModelViewDropdownList[]>(data.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error(errorMessage)
        }
    }
}

export default ReksadanaRepository