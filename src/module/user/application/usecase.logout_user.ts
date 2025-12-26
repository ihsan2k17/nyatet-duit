import { Result } from "@/shared/types/result";
import { UserModel } from "../domain/model_user";
import UserRepository from "../infrastructure/repository_user";

export class LogoutUserusecase {
    constructor(private repo: UserRepository) {}

    async logout(Username:string):Promise<Result<string>> {
        try {
            const res =  await this.repo.LogoutUser(Username)
            if(res.status) {
                return Result.success(res.message)
            }
            return Result.error(res.message)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message:'Logout Error Process'
            return Result.error(errorMessage)
        }
    }
}