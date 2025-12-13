export type transactionType = "PEMBELIAN"|"PENJUALAN"
export class EntityReksadanaTransaction {
    constructor (
        public nominaluang: number,
        public nav: number,
        public jumlahunit: number,
        public jenistrn: number,

        public iduser?: number,
        public rdnid?: number,
        public rdprodukid? : number,
        public tanggal?: Date,
        public tahun?: number,
        public norekrdn?: number,
        public portfolio?: string,
        public type?: transactionType,
        public idportfolio?: number

    ) {
        this.validate()
    }
    private validate() {
        if(this.nominaluang > 0) {

            if(this.jumlahunit <= 0) {
                throw new Error("Unit must be greater than 0")
            }

            if(this.nav <= 0) {
                throw new Error("NAV must be greater than 0")
            }
        }

        if(this.nominaluang === null || this.nominaluang <= 0) {
            this.nominaluang = 0
            this.jumlahunit = 0
            this.nav = 0
        }
    }
    isBuy() {
        return this.jenistrn === 2
    }

    isSell() {
        return this.jenistrn === 1
    }
}