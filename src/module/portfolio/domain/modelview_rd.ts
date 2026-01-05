export interface GetRekasadanaModelView {
    id?: string,
    jenis?: string,
    nama?: string,
    level?: string,
    tanggal?: Date,
    tahun?: number,
    portfolio?: string,
    nominal?: number,
    nav?: number,
    jumlahunit?: number,
    tipe?: string
}

export interface GetCountReksadanaModelView {
    countProduct : number,
    countPortfolio: number,
    sumPortfolio: number
}

export interface GetCardReksadanaModelView {
    portfolio?: string,
    totalNominal?: number,
    totalNAV?: number,
    totalUnit?: number,
    countPengelola?: number
}


export interface RawReksadana {
    id?: string,
    jenis?: string,
    pengelola?: string,
    level_resiko?: string,
    tanggal?: Date,
    tahun?: number,
    portfolio?: string,
    nominal_uang?: number,
    nav?: number,
    jumlah_unit?: number,
    type?: string
}

export interface ChartReksadanaModelView {
    tanggal?: string;
    bulan?: number;
    tahun?: number;
    nominaluang?: number;
    namasekuritas?: string;
    portfolio?: string;
}

export interface chartDataReksadanaModelView {
    [key: string]: string|number,
    bulan: number,
    tahun: number
}