import { Result } from "@/shared/types/result";
import { GetRekasadanaModelView } from "../domain/modelview";
import ReksadanaRepository from "../infrastructure/repository_reksadana";

export class GetDataListReksadanaUsecase {
    constructor(private readonly repo: ReksadanaRepository) {}

    async getdata(userid: number): Promise<Result<GetRekasadanaModelView>> {
        try {
            const res = await this.repo.GetReksadana(userid)
            if(res.status === false) {
                return Result.error<GetRekasadanaModelView>(res.message)
            }
            return Result.success<GetRekasadanaModelView>(res.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Table Error';
            return Result.error(errorMessage);
        }
    }
}