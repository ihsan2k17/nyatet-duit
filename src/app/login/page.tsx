import LoginDesktop from '@/module/user/presentation/ui/pages/logindesktop'
import LoginMobile from '@/module/user/presentation/ui/pages/loginmobile'

import { Metadata } from 'next'

export const metadata: Metadata ={
    title:"Login | Nyatet-Duit"
}
const Login = () => {
    return (
        <div>
            <div className="block md:hidden">
                <LoginMobile/>
            </div>

            <div className="hidden md:block">
                <LoginDesktop/>
            </div>
        </div>
    )
}

export default Login
