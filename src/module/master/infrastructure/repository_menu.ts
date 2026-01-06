import { supabase } from "@/libs/database/configuration";
import { RDMasterMenuRawModel } from "../domain/model_mastermenu";


export class MenuRepository {
    async getAllMenus(): Promise<RDMasterMenuRawModel[]> {
        const {data, error} = await supabase
            .from("master_menu")
            .select('id, nama, route, parent_id, urut, isacitve, icon, iconname')
            .eq('access',true)
            .eq('isacitve','active')
            .order('parent_id',{
                ascending:true
            })
        if(error) {
            throw new Error(`${error.message ?? 'Unknown Supabase error'}`)
        } 
        return data ?? []
    }

}