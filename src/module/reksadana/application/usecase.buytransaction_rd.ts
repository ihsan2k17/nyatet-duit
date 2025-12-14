import { Result } from "@/shared/types/result";
import ReksadanaRepository from "../infrastructure/repository_reksadana";
import { RDTransactionModel } from "../domain/model_rd_transaction";
import { EntityReksadanaTransaction, transactionType } from "../domain/entity_rd_transaction";

export class BuyTransactionReksadanaUsecase {
    constructor (private readonly repo: ReksadanaRepository) {}

    async Execute(model: RDTransactionModel):Promise<Result<void>> {
        try{
            const entity = new EntityReksadanaTransaction (
                model.nominaluang!,
                model.nav!,
                model.jumlahunit!,
                model.jenistrn!,
                
                model.iduser,
                model.rdnid,
                model.rdprodukid,
                model.tanggal,
                model.tahun,
                model.norekrdn,
                model.portfolio,
                model.type as transactionType,
                model.idportfolio
                
            )
            if(!entity.isBuy()) {
                return Result.error("Invalid transaction type: not BUY")
            }
            
            return await this.repo.AddBuyReksadanaTrn(entity.toModel())
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Transaction Error';
            return Result.error(errorMessage);
        }
    }
}