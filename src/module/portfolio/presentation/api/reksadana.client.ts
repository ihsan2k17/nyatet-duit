import axios from "axios"

export interface MenuApiResponse {
  success: boolean
  data?: ReksadanaItem[]
  message?: string
}
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

export async function FetchReksadanaList():Promise<MenuApiResponse> {
    try {
        const res = await axios.get("/api/portfolio/reksadana/list",{
            withCredentials:true
        })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                success:false,
                message: error.response?.data?.message || "Terjadi kesalahan saat Register"
            }
        }
        return {
            success:false,
            message: "Terjadi Kesalahan yang tidak di ketahui"
        }
    }
}