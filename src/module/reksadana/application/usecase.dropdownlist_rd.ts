import { Result } from "@/shared/types/result";
import ReksadanaRepository from "../infrastructure/repository_reksadana";
import { ModelViewDropdownList } from "@/shared/types/dropdown.list";

export class DropdownlistReksadanaUsecase {
    constructor (private readonly repo: ReksadanaRepository){}
    async DDLReksadanaJenisTrn():Promise<Result<ModelViewDropdownList[]>> {
        try {
            const res = await this.repo.DDLReksadanaJenisTrn()
            if(res.status === false) {
                return Result.error(res.message)
            }
            return Result.success<ModelViewDropdownList[]>(res.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Error';
            return Result.error(errorMessage);
        }
    }
    async DDLReksadanaRDN(userid: number):Promise<Result<ModelViewDropdownList[]>> {
        try {
            const res = await this.repo.DDLReksadanaRDN(userid)
            if(res.status === false) {
                return Result.error(res.message)
            }
            return Result.success<ModelViewDropdownList[]>(res.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Error';
            return Result.error(errorMessage);
        }
    }
    async DDLReksadanaProduk(id: number):Promise<Result<ModelViewDropdownList[]>> {
        try {
            const res = await this.repo.DDLReksadanaProduk(id)
            if(res.status === false) {
                return Result.error(res.message)
            }
            return Result.success<ModelViewDropdownList[]>(res.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Error';
            return Result.error(errorMessage);
        }
    }
    async DDLReksadanaPortfolio(id_user: number):Promise<Result<ModelViewDropdownList[]>> {
        try {
            const res = await this.repo.DDLReksadanaPortfolio(id_user)
            if(res.status === false) {
                return Result.error(res.message)
            }
            return Result.success<ModelViewDropdownList[]>(res.data)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Error';
            return Result.error(errorMessage);
        }
    }
    
}