import axios from "axios";

export interface MenuApiResponse {
  success: boolean
  data?: MenuItem[]
  message?: string
}

export interface MenuItem {
  id: number
  nama: string
  route: string
  parent_id: number | null
  urut: number
  icon: string | null
  iconName: string | null
  children: MenuItem[]
}

export async function FetchMasterMenu(): Promise<MenuApiResponse> {
    try {
        const res = await axios.get("/api/master/mainmenu",{
            withCredentials:true
        })
        return res.data
    }
    catch (error: unknown) {
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