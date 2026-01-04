import { Result } from "@/shared/types/result";
import { RekeningRepository } from "../infrastructure/repository_rekening";
import { RDRekeningViewModel } from "../domain/model_rekening";
import { EntityGetRekening } from "../domain/entity_getrekening";

export class GetRekeningUsecase {
    constructor(private repo: RekeningRepository){}

    async execute(idUser: number):Promise<Result<RDRekeningViewModel[]>> {
        if(!idUser) {
            return Result.error("User Not Found, Please your sign in again")
        }
        const raw = await this.repo.CardRekening(idUser)
        if (raw.length === 0) {
            return Result.error("Account number is empty")
        }
        const entities = raw.map(item =>
            new EntityGetRekening(
                item.id ?? 0,
                item.nama_rekening ?? "",
                item.no_rekening ?? 0,
                item.bank ?? "",
                item.isActive ?? false,
                item.saldo ?? 0
            ).withNormalizedName()
        );

        const viewModel: RDRekeningViewModel[] = entities.map(e=>({
            id: e.id ?? 0,
            nama: e.namaRekening,
            noRekening: e.noRekening,
            bank: e.bank,
            isActive: e.isActive,
            saldo:e.saldo
        }))

        return Result.success(viewModel)
    }
}