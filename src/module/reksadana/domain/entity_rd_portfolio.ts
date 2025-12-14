import { RDPortfolioModel } from "./model_rd_portfolio"

export class EntityReksadanaPortfolio {
    constructor (
        public iduser: number,
        public namaportfolio: string,
        public totaluang: number,
        public totalnav: number,
        public totalunit: number,
        public createby: string,
        public updateby: string,
        public id?: number
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
    
    toModel(): RDPortfolioModel {
        return {
            iduser:this.iduser,
            namaportfolio:this.namaportfolio,
            totaluang: this.totaluang,
            totalnav:this.totalnav,
            totalunit:this.totalunit,
            createby:this.createby,
            updateby: this.updateby,
            id:this.id
        }
    }
}