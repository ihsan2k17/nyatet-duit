'use client'
import Image from 'next/image'

import Logo from '../../../../../../../public/assets/icon/paperplane_add.svg'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/components/sidebar/sidebar'
import { navitemprops, NavMain } from './nav.main'
import { useEffect, useState } from 'react'
import { FetchMasterMenu } from '../../../api/mastermenu.client'
import { MappingMenu } from '@/shared/utils/mappingmenu'
interface props {
    name: string,
    username: string
}
const AppSidebar = ({name,username}: props) => {
    const[items, setItems] = useState<navitemprops[]>([])
    const [loading, setLoading] = useState(false)
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
    return (
        <Sidebar collapsible='icon'>
            {/* HEADER */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#" className='flex items-center gap-5 bg-sidebar-primary-foreground/70 text-sidebar'>
                                {/* <div className="bg-sidebar-foreground text-sidebar flex aspect-square size-8 items-center justify-center rounded-lg">
                                </div> */}
                                <Image src={Logo} alt='Logo' className='flex aspect-square size-8 items-center justify-center'/>
                                <div className="flex flex-col gap-0.5 leading-none right-0 group-data-[collapsible=icon]:hidden">
                                    <span className="font-semibold">Nyatet-Duit</span>
                                    <span className="">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            {/* BODY */}
            <SidebarContent>
                {loading ? <div className='p-4 text-sm text-muted-foreground'>Loading...</div>:<NavMain items={items} /> }
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
  )
}

export default AppSidebar
