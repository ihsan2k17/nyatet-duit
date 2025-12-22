import { Result } from "@/shared/types/result";
import { checkPassword } from "@/shared/utils/checkpassword";
import { EntityUserLogin } from "../domain/entity_user";
import { UserModel } from "../domain/model_user";
import UserRepository from "../infrastructure/repository_user";

export class LoginUserusecase {
    constructor(private repo: UserRepository) {}

    async Login(Username?: string, Password?:string):Promise<Result<UserModel>> {
        if(Username?.length === 0) {
            return Result.error("Username is Required")
        } else if(Password?.length === 0) {
            return Result.error("Password is Required")
        }
        try {
            const user = await this.repo.LoginUser(Username)
            if(user.status === true && user.data) {
                //domain entity
                const entityuser = new EntityUserLogin(
                    user.data.username,
                    user.data.name,
                    user.data.password,
                    Number(user.data.useractive),
                    user.data.userlevel,
                    user.data.email,
                    Number(user.data.isonline)
                )
                await checkPassword(Password ||"123456" , user.data?.password || "")
                entityuser.login() 
                await this.repo.UpdateUserOnline(entityuser.username)
                
                return Result.success<UserModel>(entityuser.toModel())
            } return Result.error<UserModel>(user.message)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Login Error Process'
            return Result.error<UserModel>(errorMessage)
        }
    }
}