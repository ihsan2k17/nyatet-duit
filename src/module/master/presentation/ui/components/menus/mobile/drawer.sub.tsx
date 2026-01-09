'use client'

import { useRouter } from 'next/navigation'
import { MenuItem } from '@/module/master/presentation/api/mastermenu.client'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/shared/ui/components/sheet/sheet'
import { Separator } from '@/shared/ui/components/separator/separator'
import { RenderIcon } from '@/shared/ui/components/icon/render.icon'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/ui/components/dropdown/dropdown'
import { IoLogOut } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/components/avatar/avatar'
import { LuChevronsUpDown } from 'react-icons/lu'
import { useToast } from '@/shared/ui/components/toast/toast'
import { Fetchlogout } from '@/module/user/presentation/api/logout.client'
import { Button } from '@/shared/ui/components/button/button'

interface Props {
  parent: MenuItem | null
  open: boolean
  onClose: () => void
  user?: {
    name: string
    email: string
    avatar: string
  }
}

const DrawerSubmenu = ({ parent, open, onClose, user }: Props) => {
  const router = useRouter()
  const toast = useToast()
    const handle = async () => {
      const response = await Fetchlogout(user!.email)
      if (response.success) {
        toast.success(response.message!)
        window.location.href = "/login" 
      } else {
        toast.error(response.message!)
      }
    }
  return (
    <Sheet open={open} onOpenChange={(v)=> !v && onClose()}>
      <SheetContent side='left' className='p-2 transition-transform duration-300"' aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle className=' text-text-invert text-lg gap-4'>
            <div className='flex flex-row gap-3 items-center'>
              <RenderIcon name={parent?.iconName} className='h-4 w-4'/>
              {parent?.nama}
            </div>
            <Separator/>
          </SheetTitle>
        </SheetHeader>
          <div className="flex flex-col gap-1">
            {parent?.children.map((child) => (
              <button
                key={child.id}
                onClick={() => {
                  onClose()
                  router.push(child.route)
                }}
                className="
                  text-left px-3 py-3 rounded-lg text-text-invert
                  hover:bg-sidebar-accent transition
                "
              >
                {child.nama}
              </button>
            ))}
          </div>
          <SheetFooter>
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="data-[state=open]:bg-sidebar-foreground data-[state=open]:text-sidebar-accent-foreground bg-sidebar-accent"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <LuChevronsUpDown  className="ml-auto size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-card-primary"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal hover:bg-sidebar-accent rounded">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-sidebar-accent rounded cursor-pointer"
              onClick={() => {
                handle()
              }}>
              <IoLogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DrawerSubmenu
