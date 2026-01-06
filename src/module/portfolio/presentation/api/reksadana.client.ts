import { MenuApiResponse } from "@/shared/types/apiresponse"
import axios, { AxiosInstance } from "axios"


export interface ReksadanaItem {
    id: string,
    jenis: string,
    nama: string,
    level: string,
    tanggal: Date,
    tahun: number,
    portfolio: string,
    nominal: number,
    nav: number,
    jumlahunit: number,
    tipe: string
}

export interface ReksadanaAggItem {
    countProduct: number,
    countPortfolio: number,
    sumPortfolio: number
}

export interface ReksadanaCardItem {
    portfolio: string,
    totalNominal: number,
    totalNAV: number,
    totalUnit: number,
    countPengelola: number
}
export class ReksadanaClient {
    private http: AxiosInstance
    constructor() {
        this.http = axios.create({
            withCredentials:true
        })
    }

    async FetchReksadanaList():Promise<MenuApiResponse<ReksadanaItem[]>> {
        try {
            const res = await this.http.get("/api/portfolio/reksadana/list")
            return res.data
        } catch (error: unknown) {
            return this.handleError(error)
        }
    }

    async FetchReksdanaCard(): Promise<MenuApiResponse<ReksadanaCardItem[]>> {
        try {
            const res = await this.http.get("/api/portfolio/reksadana/getportfolio")
            return res.data
        } catch (error: unknown) {
            return this.handleError(error)
        }
    }

    async FetchRekaadanaAggregate(): Promise<MenuApiResponse<ReksadanaAggItem>> {
        try {
            const res = await this.http.get("/api/portfolio/reksadana/aggregate")
            return res.data
        } catch (error:unknown) {
            return this.handleError(error)
        }
    }

    private handleError(error: unknown): MenuApiResponse<never> {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Request gagal",
      }
    }
    return {
      success: false,
      message: "Terjadi kesalahan yang tidak diketahui",
    }
  }
}
