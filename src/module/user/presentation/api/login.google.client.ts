import axios from "axios"

interface iloginGoogleClient {
    status: boolean,
    data?: {
        username: string,
        name: string,
        isonline: number
    }
    message?: string
}

export async function FetchGoogleLogin (
    code : string
    //username: string, name: string, email: string
):Promise<iloginGoogleClient> {
    try {
        const res = await axios.post("/api/logingoogle",{
            code
            // Username: username,
            // Name: name,
            // Email: email
        },{withCredentials:true})
        return {
            status: res.data.status,
            data: res.data.data,
            message: res.data.message
        }
    } catch (error: unknown) {
        let message= "Terjadi Kesalahan yang tidak diketahui"
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || "Terjadi kesalahan saat Login";
        }
        return {
            status: false,
            message: message
        }
    }
} 
