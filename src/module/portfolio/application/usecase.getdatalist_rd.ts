import { Result } from "@/shared/types/result";
import { GetCardReksadanaModelView, GetCountReksadanaModelView, GetRekasadanaModelView } from "../domain/modelview_rd";
import ReksadanaRepository from "../infrastructure/repository_reksadana";
import { EntityReksadanaList } from "../domain/entity_rd_list";
import { getCachedRawReksadana } from "@/libs/cache/Reksadana";

export class GetDataListReksadanaUsecase {
    constructor(private readonly repo: ReksadanaRepository) {}

    async getdata(userid: number): Promise<Result<GetRekasadanaModelView[]>> {
        try {
            const res = await getCachedRawReksadana(this.repo, userid)
            
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

    async getReksadanaAggregate(userid: number): Promise<Result<GetCountReksadanaModelView>> {
        try { 
             const res = await getCachedRawReksadana(this.repo, userid)
             if(res.length === 0) {
                return Result.error("Data not found")
            }
            const produkUnitMap: Record<string, number> = {}
            const uniquePortfolio = new Set<string>()
            let sumPortfolio = 0
            for(let i=0; i < res.length; i++) {
                const row = res[i]
                if(row.portfolio) {
                    uniquePortfolio.add(row.portfolio)
                }

                if(row.pengelola && typeof row.jumlah_unit === "number") {
                    produkUnitMap[row.pengelola] = (produkUnitMap[row.pengelola] ?? 0 ) + row.jumlah_unit
                }

                if(typeof row.nominal_uang === "number") {
                    sumPortfolio = sumPortfolio + row.nominal_uang
                }
            }   
            const ActiveProduk = Object.values(produkUnitMap).filter(
                (total) => total > 0
            ).length
            return Result.success({
                countProduct: ActiveProduk,
                countPortfolio: uniquePortfolio.size,
                sumPortfolio
            })
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Data List Table Error';
            return Result.error(errorMessage);
        } 
    }

    async kartuData(userid: number): Promise<Result<GetCardReksadanaModelView[]>> {
        // CardData ini BUKAN model response,
        // tapi struktur sementara buat proses aggregate di usecase
        // countPengelola pakai Set supaya yang dihitung UNIK (bukan per transaksi)
        type CardData = {
            portfolio: string
            totalNominal: number
            totalNAV: number
            totalUnit: number
            countPengelola: Set<string>
        }
        try {
            const res = await getCachedRawReksadana(this.repo, userid)
            // Kalau gak ada data sama sekali, langsung return error
            if(res.length === 0) {
                return Result.error("Data not found")
            }
            
            // Entity dipakai buat validasi & konsistensi domain
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
            // key   = portfolio
            // value = hasil akumulasi
            const hasil: Record<string, CardData> = {}

            // Proses agregasi manual (tanpa reduce)
            for(let i=0; i<entities.length; i++) {
                const row = entities[i]

                // Safety check: portfolio wajib ada
                if(!row.portfolio) continue
                const groupKey = row.portfolio 

                // Kalau portfolio belum pernah muncul,
                // inisialisasi object agregasinya
                if(!hasil[groupKey!]) {
                    hasil[groupKey!] = {
                        portfolio:groupKey,
                        totalNominal: 0,
                        totalNAV: 0,
                        totalUnit: 0,
                        countPengelola: new Set<string>()
                    }
                }
                // Akumulasi nilai numerik
                hasil[groupKey].totalNominal = hasil[groupKey].totalNominal! + row.nominal
                hasil[groupKey].totalNAV = hasil[groupKey].totalNAV! + row.nav
                hasil[groupKey].totalUnit = hasil[groupKey].totalUnit! + row.jumlahunit 
                
                // Set otomatis menolak duplicate,
                // jadi walaupun transaksi ada banyak,
                // nama yang sama tetap dihitung 1
                if(row.nama) {
                    hasil[groupKey].countPengelola?.add(row.nama)
                }
            }
            // Set TIDAK BOLEH keluar ke response,
            // jadi diubah ke number pakai `.size`
            const result: GetCardReksadanaModelView[] = Object.values(hasil).map(item => ({
                portfolio: item.portfolio,
                totalNominal: item.totalNominal,
                totalNAV: item.totalNAV,
                totalUnit: item.totalUnit,
                countPengelola: item.countPengelola.size
            }))
            return Result.success(result)

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Card List Table Error';
            return Result.error(errorMessage);
        }
    }
}