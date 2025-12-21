import { supabase } from "@/libs/database/configuration";
import { UserModel } from "../domain/model_user";
import { Result } from "@/shared/types/result";

class UserRepository { 
    async LoginUser (Username?:string) : Promise<Result<UserModel>> {
        try {
            const {data,error} = await supabase.rpc("lk_user",{
                p_username: Username,
                p_password: null,
                p_email: null,
                p_name: null,
                p_isonline: null,
                p_state: "LOGINUSER"
            })
            if(error) {
                return Result.error<UserModel>(error.message)
            } else if (!data) {
                return Result.error<UserModel>("User Not Found")
            }
            return Result.success(data as UserModel)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error'
            return Result.error<UserModel>(errorMessage)
        }
    }
    async RegisterUser(Username?:string, Password?:string, Name?:string, Email?:string):Promise<Result<null>>{
        try {
            const {data, error} = await supabase.rpc("lk_user", {
                p_username:Username,
                p_password:Password,
                p_name:Name||null,
                p_email: Email || null,
                p_isonline: null,
                p_state: 'REGISUSER'
            })
            if(error) {
                return Result.error(error.message)
            }
            if(!data) {
                return Result.error("Registration Failed")
            }
            return Result.success(data.message||"Registration Successfull")
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
            return Result.error(errorMessage)
        }
    }
    async CekUserGoogle(Username?:string, Name?:string, Email?:string):Promise<Result<UserModel>> {
        try {
            const {data, error} = await supabase.rpc("lk_user",{
                p_name: Name,
                p_username: Username,
                p_email: Email,
                p_state :'GOOGLEAUTH'
            })
            if(error) {
                return Result.error<UserModel>(error.message)
            }
            if(!data) {
                return Result.error<UserModel>(data.message || "Username Not Registered")
            }
            return Result.success(data as UserModel)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
            return Result.error<UserModel>(errorMessage)
        }
    }
    async UpdateUserOnline(Username?:string):Promise<Result<null>> {
        try {
            const {data, error} = await supabase.rpc("lk_user",{
                p_username:Username,
                p_isonline: 1,
                p_state: 'UPDATEISONLINE'
            })
            if(error) {
                return Result.error(error.message)
            }
            return Result.success(data.message)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
            return Result.error(errorMessage)
        }
    }
}

export default UserRepository;