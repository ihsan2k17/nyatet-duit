'use client'
import { Label } from '@radix-ui/react-label'
import SectionCardAgg from './section.cardagg'
import SectionCardPortfolio from './section.cardportfolio'
import { Button } from '@/shared/ui/components/button/button'
import { ChartAreaInteractive } from './section.charts'


interface props {
    activeTab: string
}
const TabReksadana = ({activeTab}:props) => {
    return (
        <div className={`
            flex flex-1 flex-col ${activeTab === 'reksadana' ? 'translate-x-0' : '-translate-x-full'}
            xl:px-3 lg:px-10 xl:pl-1 lg:pl-1`}>
            <div className=' flex flex-row justify-between items-center '>
                <div className='flex flex-1 flex-col'>
                    <div className={`text-xl font-bold pl-1 text-button-primary`}>
                        <h1>Nilai Portfolio Yang Lu Punya</h1>
                    </div>
                    <div>
                        <Label htmlFor="label description" className='font-normal pl-1 text-button-primary'>
                            Record individual mutual fund ownership
                        </Label>
                    </div>
                </div>
                <Button className='hover:text-text-primary'>Add Portfolio</Button>
            </div>
            <div className="flex flex-1 flex-col">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
                    <SectionCardAgg />
                </div>
                <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                    <SectionCardPortfolio />
                </div>
                <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                    <ChartAreaInteractive />
                </div>
            </div>
        </div>
    )
}

export default TabReksadana
