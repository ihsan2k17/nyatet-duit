'use client'
import UseIsWidth from "@/shared/hooks/usewidth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/dropdown/dropdown"
import { Button } from "../../components/button/button"
import { useEffect, useState } from "react"
import { MenuItem } from "@/shared/types/menuitem"
import { usePathname } from "next/navigation"
import { getNotProtectedRoutes } from "@/libs/database/notprotectedroutes"
import { FiArrowDown } from "react-icons/fi"

const MobileLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    const tgl = new Date()
    const datenow = tgl.getFullYear().toString()
    const useWidth = UseIsWidth()
    const [routes, setRoutes] = useState<MenuItem[]>([])
    const pathname = usePathname()
    useEffect(() => {
        getNotProtectedRoutes().then(setRoutes)
    }, [])
    const activeRoute = routes.find(r => r.route === pathname)?.nama ?? "None"
    return (
        <section className={`flex flex-1 flex-col min-h-screen relative
        before:absolute before:inset-0 before:bg-primary before:opacity-75 before:pointer-events-none
        bg-[url('/assets/image/bg.jpg')] bg-no-repeat bg-cover bg-center`}>
            <header className={`absolute right-0 top-0 z-10 p-2`}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-label="Open menu" className="gap-2 group">
                            {activeRoute}
                            <FiArrowDown 
                                className={`transition-transform duration-200 group-data-[state=open]:rotate-180`}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Go To</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {routes.map(route => (
                            <DropdownMenuItem key={route.id} asChild>
                                <a key={route.id} href={route.route}>
                                    <span>{route.nama}</span>
                                </a>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="flex-1 relative w-full flex flex-col min-h-0">
                {children}
            </main>
            <footer className="h-12 text-center py-3 z-100">
                <label className={`text-button-primary font-bold ${useWidth ? 'text-xs': 'text-base'}`}>
                    Powered by Nextjs, Freepik and Supabase © {datenow}
                </label>
            </footer>
        </section>
    )
}

export default MobileLayout
