export interface RDRekeningRawModel {
    id? :number,
    nama_rekening? : string, 
    no_rekening? : number,
    id_user? : number,
    bank? : string,
    nama_sekuritas? : string,
    saldo? : number,
    mata_uang? : string,
    isActive? : boolean
}

export interface RDRekeningViewModel {
    id: number,
    nama: string,
    noRekening: number,
    bank: string,
    isActive: boolean
}