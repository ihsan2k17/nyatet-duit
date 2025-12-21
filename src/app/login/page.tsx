import LoginDesktop from '@/module/user/presentation/ui/pages/logindesktop'
import LoginMobile from '@/module/user/presentation/ui/pages/loginmobile'
import Responsive from '@/shared/ui/layout'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata ={
    title:"Login | Nyatet-Duit"
}
const Login = () => {
    return (
        <Responsive 
            Mobile={<LoginMobile/>}
            Desktop={<LoginDesktop/>}
        />
    )
}

export default Login
