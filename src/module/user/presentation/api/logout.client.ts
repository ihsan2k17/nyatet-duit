import axios from "axios"

export interface ApiResponse {
  success: boolean
  message?: string
}

export async function Fetchlogout(Username: string):Promise<ApiResponse> {
    try {
        const res = await axios.post("/api/logout", {
            Username:Username
        }, {
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