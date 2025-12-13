export class EntityReksadanaPortfolio {
    constructor (
        public iduser: number,
        public namaportfolio: string,
        public totaluang: number,
        public totalnav: number,
        public totalunit: number,
        public createby: string,
        public updateby: string,
    ) {
        this.validate()
    }

    private validate() {
        if(this.namaportfolio || this.namaportfolio.trim() === "") {
            throw new Error("Name is Required")
        }

        if(this.totaluang < 0) this.totaluang = 0
        if(this.totalnav < 0) this.totalnav = 0
        if(this.totalunit < 0) this.totalunit = 0
    }
}