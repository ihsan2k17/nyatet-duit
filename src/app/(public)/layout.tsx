import DesktopLayout from '@/shared/ui/layout/global/desktop';
import MobileLayout from '@/shared/ui/layout/global/mobile';
import { Metadata } from 'next';
import React from 'react'
export const metadata:Metadata = {
    icons:{
        icon:"/favicon.ico"
    }
}
const Layout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    return (
        // <Responsive 
        //     Mobile= {
        //         <MobileLayout>{children}</MobileLayout>
        //     }
        //     Desktop = {
        //         <DesktopLayout>{children}</DesktopLayout>
        //     }
        // />
        <div>
            <div className="block md:hidden">
                <MobileLayout>{children}</MobileLayout>
            </div>

            <div className="hidden md:block">
                <DesktopLayout>{children}</DesktopLayout>
            </div>
        </div>
    )
}

export default Layout
