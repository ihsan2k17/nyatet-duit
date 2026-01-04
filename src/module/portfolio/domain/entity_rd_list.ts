
export class EntityReksadanaList {
    constructor(
        readonly id: string,
        readonly jenis: string,
        readonly nama: string,
        readonly level: string,
        readonly tanggal: Date,
        readonly tahun: number,
        readonly portfolio: string,
        readonly nominal: number,
        readonly nav: number,
        readonly jumlahunit: number,
        readonly tipe: string
    ) {
        if (!id) {
        throw new Error("Id is required")
        }
        
        if (nominal < 0) {
            throw new Error("Nominal is Not A minus")
        }

        if (nav < 0) {
            throw new Error("NAV is not A minus")
        }

        if (jumlahunit < 0) {
            throw new Error("Unit is Not A minus")
        }

    }

    withNormalizedName(): EntityReksadanaList {
        return new EntityReksadanaList(
            this.id,
            this.jenis,
            this.nama,
            this.level,
            this.tanggal,
            this.tahun,
            this.portfolio,
            this.nominal,
            this.nav,
            this.jumlahunit,
            this.tipe
        )
    }
}
