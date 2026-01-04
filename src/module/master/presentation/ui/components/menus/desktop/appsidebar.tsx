'use client'
import Image from 'next/image'
import Logo from '../../../../../../../../public/assets/icon/paperplane_add.svg'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/components/sidebar/sidebar'
import { MasterMenuSeed } from '@/module/master/domain/seed_mastermenu'
import { navitemprops, NavMain } from './nav.main'
import { NavSecondary } from './nav.secondary'
import { NavUser } from './nav.user'

interface props {
    name: string,
    username: string,
    items: navitemprops[]
    loading: boolean
}
const AppSidebar = ({name,username, items, loading}: props) => {
    
    
    return (
        <Sidebar collapsible='icon'>
            {/* HEADER */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#" className='flex items-center gap-5 bg-sidebar-primary-foreground/70 text-sidebar'>
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
                <NavSecondary items={MasterMenuSeed.navSecondary} className='mt-auto' />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name:name,
                    email:username,
                    avatar: '/assets/image/avatar_lion.png'
                }}/>
            </SidebarFooter>
        </Sidebar>
  )
}

export default AppSidebar
