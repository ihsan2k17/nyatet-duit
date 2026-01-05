import { Result } from "@/shared/types/result";
import { GetRekasadanaModelView } from "../domain/modelview_rd";
import ReksadanaRepository from "../infrastructure/repository_reksadana";
import { EntityReksadanaList } from "../domain/entity_rd_list";

export class GetDataListReksadanaUsecase {
    constructor(private readonly repo: ReksadanaRepository) {}

    async getdata(userid: number): Promise<Result<GetRekasadanaModelView[]>> {
        try {
            const res = await this.repo.GetReksadana(userid)
            
            if(res.length === 0) {
                return Result.error("Data not found")
            }

            const entities = res.map(item => 
                new EntityReksadanaList(
                    item.id ?? "No Id",
                    item.jenis ?? "",
                    item.pengelola ?? "",
                    item.level_resiko ?? "",
                    item.tanggal ?? new Date(),
                    item.tahun ?? 1900,
                    item.portfolio ?? "No Name",
                    item.nominal_uang ?? 0,
                    item.nav ?? 0,
                    item.jumlah_unit ?? 0,
                    item.type ?? ""
                )
            )

            const mapped: GetRekasadanaModelView[] = entities.map(item => ({
                id: item.id,
                jenis: item.jenis,
                nama: item.nama,
                level: item.level,
                tanggal: item.tanggal,
                tahun: item.tahun,
                portfolio: item.portfolio,
                nominal: item.nominal,
                nav: item.nav,
                jumlahunit: item.jumlahunit,
                tipe: item.tipe
            }))

            return Result.success(mapped)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Table Error';
            return Result.error(errorMessage);
        }
    }
}