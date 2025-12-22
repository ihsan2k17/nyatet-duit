import { FetchGoogleLogin } from "@/module/user/presentation/api/login.google.client"
import { useGoogleLogin } from "@react-oauth/google"

interface iloginGoogleClient {
    status: boolean,
    data?: {
        username: string,
        name: string,
        isonline: number
    }
    message?: string
}

const GoogleLogin = (
    onResult?: (res: iloginGoogleClient) => void
) => {
    const googleLogin = useGoogleLogin({
        flow:'auth-code',
        onSuccess: async (codeResponse) => {
            try {
                const res = await FetchGoogleLogin(
                    codeResponse.code
                )
                onResult?.(res)
            } catch {
                onResult?.({
                    status: false,
                    message: "Login Google gagal"
                })
            }
        }
    })
    return {googleLogin}
}

export default GoogleLogin