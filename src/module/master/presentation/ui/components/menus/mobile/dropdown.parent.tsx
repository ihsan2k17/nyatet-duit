import { Button } from '@/shared/ui/components/button/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/ui/components/dropdown/dropdown';
import React from 'react'
import { FiArrowDown } from 'react-icons/fi';
interface Props {
  parents: { id: number; nama: string; route: string }[];
  activeParent: { id: number; nama: string; route: string } | null;
  onSelect: (parent: { id: number; nama: string; route: string }) => void;
}
const DropdownParent = ({parents, activeParent, onSelect}:Props) => {
    return (
        // <select
        //     value={activeParent?.id ?? ""}
        //     onChange={(e) => {
        //         const parent = parents.find(p => p.id === Number(e.target.value));
        //         if (parent) onSelect(parent);
        //     }}
        //     className="border rounded px-2 py-1"
        // >
        // <option value="" disabled>Pilih Menu</option>
        // {parents.map(p => (
        //     <option key={p.id} value={p.id}>{p.nama}</option>
        // ))}
        // </select>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    aria-label='open drawer'
                    className='w-full justify-between'>
                    {activeParent?.nama ?? 'Pilih Menu'}
                    <FiArrowDown 
                        className={`transition-transform duration-200 group-data-[state=open]:rotate-180`}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' aria-describedby={undefined}>
                <DropdownMenuLabel>Go To</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {parents.map((parent) => (
                    <DropdownMenuItem 
                        onClick={() => onSelect(parent)}
                        key={parent.id} asChild>
                            <span>{parent.nama}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownParent
