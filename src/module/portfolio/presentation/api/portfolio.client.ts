import { MenuApiResponse } from "@/shared/types/apiresponse";
import axios, { AxiosInstance } from "axios";

export type ChartsPortfolio = {
    bulan: number,
    tahun: number,
    [key: string]: number
}

export class PortfolioClient {
    private http: AxiosInstance
    constructor() {
        this.http = axios.create({
            withCredentials:true
        })
    }

    async chartPortfolioReksadana ():Promise<MenuApiResponse<ChartsPortfolio[]>> {
        try {
            const res = await this.http.get("/api/portfolio/reksadana/charts")
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