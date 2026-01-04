
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
        if(!this.namaportfolio || this.namaportfolio.trim() === "") {
            throw new Error("Name is Required")
        }

        if(this.totaluang < 0) throw new Error(`Money Is Not A Minus`)//this.totaluang = 0
        if(this.totalnav < 0) throw new Error(`Nav Is Not A Minus`) //this.totalnav = 0
        if(this.totalunit < 0) throw new Error(`Unit Is Not A Minus`) //this.totalunit = 0
    }
    
    // toModel(): EntityReksadanaPortfolio {
    //     return new EntityReksadanaPortfolio (
    //         this.iduser,
    //         this.namaportfolio,
    //         this.totaluang,
    //         this.totalnav,
    //         this.totalunit,
    //         this.createby,
    //         this.updateby,
    //         this.id
    //     )
    // }
}