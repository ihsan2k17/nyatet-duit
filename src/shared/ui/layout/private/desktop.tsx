'use client'
import React, { useEffect, useState } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../components/sidebar/sidebar'
import AppSidebar from '@/module/master/presentation/ui/components/menus/desktop/appsidebar'
import { Separator } from '../../components/separator/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/breadcrumb/breadcrumb'
import { navitemprops } from '@/module/master/presentation/ui/components/menus/desktop/nav.main'
import { FetchMasterMenu } from '@/module/master/presentation/api/mastermenu.client'
import { MappingMenu } from '@/shared/utils/mappingmenu'
import { usePathname } from 'next/navigation'


interface props {
    children: React.ReactNode,
    name: string,
    username:string,
    defaultOpen: boolean
}
const DesktopLayout = ({children, name, username, defaultOpen}: props) => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<navitemprops[]>([])
    const pathname = usePathname()

    useEffect(() => {
        async function loadMenu() {
            setLoading(true)
            const res = await FetchMasterMenu()
            if(res.success) {
                setItems(MappingMenu(res.data!))
                setLoading(false)
            } else {
                console.error("Gagal load menu:", res.message)
            }
            setLoading(false)
        }
        loadMenu()
    },[])

    const buildBreadcrumbs = (menu: navitemprops[], path: string) => {
        const breadcrumbs: { name: string; href: string }[] = []

        function findPath(items: Partial<navitemprops>[], parentPath = '') {
            for (const item of items) {
                if (!item.url || !item.title) continue
                const fullPath = parentPath + item.url
                if (path.startsWith(fullPath)) {
                    breadcrumbs.push({ name: item.title, href: fullPath })
                    if (item.items && item.items.length) findPath(item.items, fullPath)
                }
            }
        }

        findPath(menu)
        return breadcrumbs
    }

    const breadcrumbs = buildBreadcrumbs(items, pathname);
    return (
        <SidebarProvider defaultOpen={defaultOpen} 
            >
            <AppSidebar 
                name={name} 
                username={username}
                items={items} setItems={setItems}
                loading={loading} setLoading={setLoading}/>
            <SidebarInset>
                <header className="flex shrink-0 items-center gap-2 border-b border-sidebar p-2">
                    <SidebarTrigger className='text-text-primary hover:bg-button-primary hover:text-text-invert'/>
                    <Separator 
                        orientation='vertical'
                        className='data-[orientation=vertical]: h-4' />
                    <Breadcrumb>
                        <BreadcrumbList className='font-semibold hover:font-bold'>
                            {breadcrumbs.map((b, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <BreadcrumbSeparator className='hidden md:block' />}
                                {i < breadcrumbs.length - 1 
                                ? <BreadcrumbItem className='hidden md:block'>
                                    <BreadcrumbLink href={b.href}>{b.name}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                : <BreadcrumbItem>
                                    <BreadcrumbPage>{b.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                }
                            </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="flex flex-col w-full min-w-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DesktopLayout
