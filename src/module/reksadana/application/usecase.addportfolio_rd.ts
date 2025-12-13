import { Result } from "@/shared/types/result";
import { PortfolioRepository } from "../infrastructure/repository_portfolio";
import { EntityReksadanaPortfolio } from "../domain/entity_rd_portfolio";
import { RDPortfolioModel } from "../domain/model_rd_portfolio";

export class AddPortfolioReksadanaUsecase {
    constructor(private repo: PortfolioRepository) {}

    async execute(entityData: EntityReksadanaPortfolio): Promise<Result<void>> {
        
        try {
            const existedNames = await this.repo.ListNameRDPortfolio(entityData.iduser!)
            if(existedNames.status === false) {
                return Result.error(existedNames.message)
            }
            let nameResult:string[] = []
            if(existedNames.data?.namaportfolio) {
                if(Array.isArray(existedNames.data.namaportfolio)) {
                    nameResult = existedNames.data.namaportfolio
                } else {
                    nameResult = [existedNames.data.namaportfolio]
                }
            }
            else {
                nameResult = []
            }
            if(nameResult.includes(entityData.namaportfolio)) {
                return Result.error("Nama Is Already Exists")
            }
            const model: RDPortfolioModel = {
                iduser: entityData.iduser,
                namaportfolio: entityData.namaportfolio,
                totaluang: entityData.totaluang,
                totalnav: entityData.totalnav,
                totalunit: entityData.totalunit,
                createby: entityData.createby,
                updateby: entityData.updateby
            };
            return await this.repo.AddRDPortfolio(model)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Transaction Error';
            return Result.error(errorMessage);
        }
    }
} 