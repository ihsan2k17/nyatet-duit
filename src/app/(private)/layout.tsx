import DesktopLayout from "@/shared/ui/layout/private/desktop";
import MobileLayout from "@/shared/ui/layout/private/mobile";
import { cookies, headers } from 'next/headers';
import { Metadata } from "next";

export const metadata:Metadata = {
    icons:{
        icon:"/favicon.ico"
    }
}
const Layout =async ({children,}: Readonly<{children: React.ReactNode;}>) => {
    const headersList =await headers();
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    const name = headersList.get("x-name") ?? "";
    const username = headersList.get("x-username") ?? "";
    return (
        <div>
            <div className="block md:hidden">
                <MobileLayout>{children}</MobileLayout>
            </div>

            <div className="hidden md:block">
                <DesktopLayout 
                    name={name} 
                    username={username}
                    defaultOpen={defaultOpen}>
                    {children}
                </DesktopLayout>
            </div>
        </div>
    )
}

export default Layout