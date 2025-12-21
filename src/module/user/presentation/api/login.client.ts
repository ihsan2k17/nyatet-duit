import axios from 'axios'
import { Dispatch, SetStateAction } from 'react';

interface iloginClient {
    status: boolean,
    token: string,
    data: {
        username: string,
        name: string,
        isonline: number
    }
}

export async function fetchLogin(
    username: string,
    password: string, 
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
): Promise<iloginClient | null> {
    setError("")
    try {
        setLoading(true)
        const res = await axios.post("/api/login", {
            Username: username, 
            Password: password
        }, {withCredentials:true})
        if(res.data.status) {
            return res.data
        } else {
            setError("Login Failed, Please Sign up")
            return null
        }
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            setError(error.response?.data?.message || "Terjadi kesalahan saat login");
        } else {
            setError("Terjadi kesalahan yang tidak diketahui");
        }
        return null; // error, kembalikan null
    }
    finally {
        setLoading(false)
    }
}