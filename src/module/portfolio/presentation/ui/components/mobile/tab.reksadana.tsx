'use client'
import { Label } from '@/shared/ui/components/label/label'
import DivCardAgg from './div.cardagg'
import DivCardPortfolio from './div.cardportfolio'
import { DivChart } from './div.charts'

interface props {
    activeTab: string,
    name?: string|null,
    username?:string|null
}
const TabReksadana = ({activeTab, name}:props) => {
    return (
        <div className={`${activeTab === 'reksadana' ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='flex flex-1 flex-col mt-2.5 gap-2'>
                <DivCardAgg/>
                <DivCardPortfolio name={name}/>
                <div className='container mt-3'>
                    <DivChart />
                </div>
            </div>
        </div>
    )
}

export default TabReksadana
