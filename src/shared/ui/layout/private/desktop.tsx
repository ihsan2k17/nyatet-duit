'use client'
import React from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../components/sidebar/sidebar'
import AppSidebar from '@/module/master/presentation/ui/components/menus/desktop/appsidebar'


interface props {
    children: React.ReactNode,
    name: string,
    username:string,
    defaultOpen: boolean
}
const DesktopLayout = ({children, name, username, defaultOpen}: props) => {
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar name={name} username={username}/>
            <SidebarInset>
                <SidebarTrigger/>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DesktopLayout
