'use client'
import { FetchMasterMenu, MenuItem } from '@/module/master/presentation/api/mastermenu.client'
import DrawerSubmenu from '@/module/master/presentation/ui/components/menus/mobile/drawer.sub'
import DropdownParent from '@/module/master/presentation/ui/components/menus/mobile/dropdown.parent'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/button/button'
import { FiSidebar } from 'react-icons/fi'

interface props {
    children: React.ReactNode
}
const MobileLayout = ({children}:props) => {
    const [menuTree, setMenuTree] = useState<MenuItem[]>([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const path = usePathname()
    const foundParent =
        menuTree.find((p) => p.route === path) ||
        menuTree.find((p) =>
            p.children?.some((c) => c.route === path)
        ) || null;
    useEffect(() => {
        FetchMasterMenu().then((res) => {
        if (res.success && res.data) {
            setMenuTree(res.data)
        }
        setLoading(false)
        })
    }, [])
    if (loading) {
        return <div className="p-4">Loading menu...</div>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className='flex flex-row justify-between p-2 sticky gap-5'>
                <div className='flex-1'>
                    <Button 
                        onClick={() => setOpenDrawer(true)}>
                        <FiSidebar />
                    </Button>
                    <DrawerSubmenu 
                        parent={foundParent}
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                        />
                </div>
                <div className='flex-1'>
                    <DropdownParent
                        parents={menuTree}
                        activeParent={foundParent}
                        onSelect={(parent) => router.push(parent.route)}
                    />
                </div>
            </div>
            <main className="flex-1">{children}</main>
        </div>
  )
}

export default MobileLayout
