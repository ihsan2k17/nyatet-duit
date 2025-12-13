import { Result } from "@/shared/types/result";
import { hashingPassword } from "@/shared/utils/hashingpassword";
import { UserModel } from "../domain/model_user";
import UserRepository from "../infrastructure/repository_user";

export class RegisterUserusecase {
    constructor(private repo: UserRepository){}

    async Register(Username?:string, Password?:string, Name?:string, Email?:string):Promise<Result<UserModel>> {
        if(Username?.length === 0){
            return Result.error("Username is Required")
        } else if (Password?.length === 0) {
            return Result.error("Password is Required")
        } 
        try {
            const hash = await hashingPassword(Password||"123456")
            const result = await this.repo.RegisterUser(Username, hash, Name, Email)
            if(result.status === false) {
                return Result.error<UserModel>(result.message)
            }
            return Result.success<UserModel>(undefined, result.message)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Register Error Process'
            return Result.error<UserModel>(errorMessage)
        }
    }
}