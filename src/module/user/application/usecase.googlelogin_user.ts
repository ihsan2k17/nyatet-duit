import { Result } from "@/shared/types/result";
import { hashingPassword } from "@/shared/utils/hashingpassword";
import { UserDomain } from "../domain/entity_user";
import { UserModel } from "../domain/model_user";
import UserRepository from "../infrastructure/repository_user";

export class GoogleLoginUserusecase {
    constructor(private repo: UserRepository) {}

    async CekGoogle(Username?:string, Password?: string, Name?:string, Email?:string):Promise<Result<UserModel>> {
        try {
            const result = await this.repo.CekUserGoogle(Username, Name, Email)
            
            // kalo user gak ada maka regis dan abis itu login 
            if(result.status === false){
                const hash = await hashingPassword(Password||"123456789")
                const regist = await this.repo.RegisterUser(Username, hash, Name, Email)
                if(regist.status === false) {
                    return Result.error(regist.message)
                }
                // REGIS SUKSES LANGSUNG KE LOGIN
                const data = await this.repo.LoginUser(Username)
                if(data.status === true && data.data){
                    //domain entity
                    const entityuser = new UserDomain(
                        data.data.username,
                        data.data.name,
                        data.data.password,
                        Number(data.data.useractive),
                        data.data.userlevel,
                        data.data.email,
                        Number(data.data.isonline)
                    )
                    entityuser.login() 
                    await this.repo.UpdateUserOnline(entityuser.username, entityuser.isonline)
                    return Result.success<UserModel>(data.data, "Register Google Success")
                }
                return Result.error<UserModel>(data.message)
            }

            // Kalo user nya ada langsung lari ke login di repository 
            const data = await this.repo.LoginUser(result.data!.username)
            if(data.status === true && data.data){
                    //domain entity
                    const entityuser = new UserDomain(
                        data.data.username,
                        data.data.name,
                        data.data.password,
                        Number(data.data.useractive),
                        data.data.userlevel,
                        data.data.email,
                        Number(data.data.isonline)
                    )
                    entityuser.login() 
                    await this.repo.UpdateUserOnline(entityuser.username, entityuser.isonline)
                    return Result.success<UserModel>(data.data, "Login Google Success")
                }
                return Result.error<UserModel>(data.message)
            
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Login Error Process'
            return Result.error<UserModel>(errorMessage)
        }
    }
}