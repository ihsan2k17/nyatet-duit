import axios from "axios"

export interface MenuApiResponse {
  success: boolean
  data?: RekeningItem[]
  message?: string
}

export interface RekeningItem {
    id: number,
    nama: string,
    noRekening: number,
    bank: string,
    isActive: boolean,
    saldo: number
}

export async function FetchRekening(): Promise<MenuApiResponse> {
  try{
    const res = await axios.get("/api/rekening/getdata",{withCredentials:true})
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