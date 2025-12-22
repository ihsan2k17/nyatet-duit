import axios from "axios";

interface IRegisterClient {
    status: boolean,
    message?: string
}

export async function fetchRegister(
    username: string,
    password: string,
    email: string,
    name: string
):Promise<IRegisterClient> {
    try {
        const res = await axios.post("/api/register", {
            Username: username,
            Password: password,
            Name: name,
            Email: email
        },{withCredentials:true})
        return {
            status: res.data.status
        }
    } catch (error: unknown) {
        let message= "Terjadi Kesalahan yang tidak diketahui"
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || "Terjadi kesalahan saat Register";
        }
        return {
            status: false,
            message: message
        }
    }
}