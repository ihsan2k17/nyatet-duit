import { Result } from "@/shared/types/result";
import { PortfolioRepository } from "../infrastructure/repository_portfolio";
import { EntityReksadanaPortfolio } from "../domain/entity_rd_portfolio";
import { RDPortfolioModel } from "../domain/model_rd_portfolio";

export class AddPortfolioReksadanaUsecase {
    constructor(private repo: PortfolioRepository) {}

    async execute(model: RDPortfolioModel): Promise<Result<void>> {
        try {

            const entityData = new EntityReksadanaPortfolio (
                model.iduser!,
                model.namaportfolio!,
                model.totaluang!,
                model.totalnav!,
                model.totalunit!,
                model.createby!,
                model.updateby!
            );

            const existedNames = await this.repo.ListNameRDPortfolio(entityData.iduser)
            if(existedNames.status === false) {
                return Result.error(existedNames.message)
            }
            const nameResult: string[] = (existedNames.data ?? [])
                .map(e => e.namaportfolio ?? undefined)
                .filter(x => x !== undefined)
                
            if(nameResult.includes(entityData.namaportfolio)){
                return Result.error("Name Already Exists")
            } 
            
            return await this.repo.AddRDPortfolio(entityData.toModel())
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Transaction Error';
            return Result.error(errorMessage);
        }
    }
} 