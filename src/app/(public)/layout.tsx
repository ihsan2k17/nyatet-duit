import Responsive from '@/shared/ui/layout';
import DesktopLayout from '@/shared/ui/layout/global/desktop';
import MobileLayout from '@/shared/ui/layout/global/mobile';
import React from 'react'
export const metadata = {
    Icons:{
        icon:"/paperlane_add.svg"
    }
}
const Layout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    return (
        <Responsive 
            Mobile= {
                <MobileLayout>{children}</MobileLayout>
            }
            Desktop = {
                <DesktopLayout>{children}</DesktopLayout>
            }
        />
    )
}

export default Layout
