import { supabase } from "@/libs/database/configuration";
import { Result } from "@/shared/types/result";
import { RDMasterMenuRawModel } from "../domain/model_mastermenu";


export class MenuRepository {
    async getAllMenus(): Promise<Result<RDMasterMenuRawModel[]>> {
        try {
            const {data, error} = await supabase
                .from("master_menu")
                .select('id, nama, route, parent_id, urut, isacitve, icon, iconname')
                .eq('access',true)
                .eq('isacitve','active')
                .order('parent_id',{
                    ascending:true
                })
            if(error) {
                return Result.error(error.message)
            } else {
                return Result.success<RDMasterMenuRawModel[]>(data as RDMasterMenuRawModel[])
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Internal Server Error'
            return Result.error(errorMessage)
        }
    }

    async getParentMenus():Promise<Result<RDMasterMenuRawModel[]>> {
        try {
            const {data, error} = await supabase
                .from("master_menu")
                .select('id, nama, route, parent_id, urut, isacitve, icon, iconname')
                .eq('access',true)
                .eq('isacitve','active')
                .eq('parent_id', null)
                .order('parent_id',{
                    ascending:true
                })
            if(error) {
                return Result.error(error.message)
            } else {
                return Result.success<RDMasterMenuRawModel[]>(data as RDMasterMenuRawModel[])
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Internal Server Error'
            return Result.error(errorMessage)
        }
    }

    async getChildrenMenus(parent: number):Promise<Result<RDMasterMenuRawModel[]>> {
        try {
            const {data, error} = await supabase
                .from("master_menu")
                .select('id, nama, route, parent_id, urut, isacitve, icon, iconname')
                .eq('access',true)
                .eq('isacitve','active')
                .eq('parent_id', parent)
                .order('parent_id',{
                    ascending:true
                })
            if(error) {
                return Result.error(error.message)
            } else {
                return Result.success<RDMasterMenuRawModel[]>(data as RDMasterMenuRawModel[] ?? [])
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Internal Server Error'
            return Result.error(errorMessage)
        }
    } 
}