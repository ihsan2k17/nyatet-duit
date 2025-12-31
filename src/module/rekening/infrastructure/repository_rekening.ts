import { supabase } from "@/libs/database/configuration";
import { RDRekeningRawModel } from "../domain/model_rekening";

export class RekeningRepository {
    async CardRekening(iduser: number):Promise<RDRekeningRawModel[]> {
        try {
            const {data, error} = await supabase.rpc("lk_rekening",{
                p_iduser: iduser,
                p_state: 'CEKREKENING'
            })
            if(error) {
                throw error
            }
            
            return data?.data ?? []
            
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Internal Server Error'
            throw new Error(errorMessage)
        }
    }
}