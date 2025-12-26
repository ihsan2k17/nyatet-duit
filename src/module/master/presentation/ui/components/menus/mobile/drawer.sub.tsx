'use client'

import { useRouter } from 'next/navigation'
import { MenuItem } from '@/module/master/presentation/api/mastermenu.client'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/shared/ui/components/sheet/sheet'
import { Separator } from '@/shared/ui/components/separator/separator'
import { resolveIcon } from '../../../../../../../shared/utils/icon.registry'
import { RenderIcon } from '@/shared/ui/components/icon/render.icon'

interface Props {
  parent: MenuItem | null
  open: boolean
  onClose: () => void
}

const DrawerSubmenu = ({ parent, open, onClose }: Props) => {
  const router = useRouter()
  if(!parent || !parent.children?.length) return null

  return (
    <Sheet open={open} onOpenChange={(v)=> !v && onClose()}>
      <SheetContent side='left' className='p-2 transition-transform duration-300"' aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle className=' text-text-invert text-lg gap-4'>
            <div className='flex flex-row gap-3 items-center'>
              <RenderIcon name={parent.iconName} className='h-4 w-4'/>
              {parent.nama}
            </div>
            <Separator/>
          </SheetTitle>
        </SheetHeader>
          <div className="flex flex-col gap-1">
          {parent.children.map((child) => (
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
      </SheetContent>
    </Sheet>
  )
}

export default DrawerSubmenu
