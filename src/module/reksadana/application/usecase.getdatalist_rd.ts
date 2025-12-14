import { Result } from "@/shared/types/result";
import { GetRekasadanaModelView, RawReksadana } from "../domain/modelview";
import ReksadanaRepository from "../infrastructure/repository_reksadana";

export class GetDataListReksadanaUsecase {
    constructor(private readonly repo: ReksadanaRepository) {}

    async getdata(userid: number): Promise<Result<GetRekasadanaModelView[]>> {
        try {
            const res = await this.repo.GetReksadana(userid)
            if(res.status === false) {
                return Result.error(res.message)
            }
            const mapped: GetRekasadanaModelView[] = (res.data as RawReksadana[]).map(item => ({
                id: item.id,
                jenis: item.jenis,
                nama: item.nama,
                level: item.level,
                tanggal: item.tanggal,
                tahun: item.tahun,
                portfolio: item.portfolio,
                nominal: item.nominal,
                nav: item.nav,
                jumlahunit: item.jumlah_unit,
                tipe: item.tipe
            }))

            return Result.success<GetRekasadanaModelView[]>(mapped)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Table Error';
            return Result.error(errorMessage);
        }
    }
}