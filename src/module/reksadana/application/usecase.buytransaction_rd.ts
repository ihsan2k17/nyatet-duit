import { Result } from "@/shared/types/result";
import ReksadanaRepository from "../infrastructure/repository_reksadana";
import { RDTransactionModel } from "../domain/model_rd_transaction";
import { EntityReksadanaTransaction } from "../domain/entity_rd_transaction";

export class BuyTransactionReksadanaUsecase {
    constructor (private readonly repo: ReksadanaRepository) {}

    async Execute(entity: EntityReksadanaTransaction):Promise<Result<void>> {
        try{

            if(!entity.isBuy()) {
                return Result.error("Invalid transaction type: not BUY")
            }
            const model:RDTransactionModel = {
                rdnid: entity.rdnid,
                jenistrn: entity.jenistrn,
                rdprodukid: entity.rdprodukid ,
                iduser: entity.iduser,
                tanggal: entity.tanggal,
                tahun: entity.tahun,
                norekrdn: entity.norekrdn,
                portfolio: entity.portfolio,
                nominaluang: entity.nominaluang ,
                nav: entity.nav ,
                jumlahunit: entity.jumlahunit,
                type: entity.type ,
                idportfolio: entity.idportfolio
            }
            return await this.repo.AddBuyReksadanaTrn(model)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Transaction Error';
            return Result.error(errorMessage);
        }
    }
}