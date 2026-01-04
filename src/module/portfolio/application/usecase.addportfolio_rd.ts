import { Result } from "@/shared/types/result";
import { PortfolioRepository } from "../infrastructure/repository_portfolio";
import { EntityReksadanaPortfolio } from "../domain/entity_rd_portfolio";
interface AddPortfolio {
    id?: number,
    iduser?: number,
    namaportfolio?: string,
    totaluang?: number,
    totalnav?: number,
    totalunit?: number,
    createby?: string,
    updateby?: string
}
export class AddPortfolioReksadanaUsecase {
    constructor(private repo: PortfolioRepository) {}
    
    async execute(input: AddPortfolio): Promise<Result<void>> {
        try {

            const entityData = new EntityReksadanaPortfolio (
                input.iduser!,
                input.namaportfolio!,
                input.totaluang!,
                input.totalnav!,
                input.totalunit!,
                input.createby!,
                input.updateby!
            );

            const existedNames = await this.repo.CheckNameRDPortfolio(input.iduser!, input.namaportfolio!)
            
            if (existedNames) {
                return Result.error("Name Already Exists")
            }
            
            await this.repo.AddRDPortfolio(entityData)
            return Result.success()
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Transaction Error';
            return Result.error(errorMessage);
        }
    }
} 