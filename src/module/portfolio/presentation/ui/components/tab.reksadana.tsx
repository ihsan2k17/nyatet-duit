'use client'
import SectionCardAgg from './section.cardagg'
import SectionCardPortfolio from './section.cardportfolio'

interface props {
    activeTab: string
}
const TabReksadana = ({activeTab}:props) => {
    return (
        <div className={`flex flex-1 flex-col px-2 ${activeTab === 'reksadana' ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className={`text-xl font-bold pl-1 text-button-primary`}>
                <h1>Nilai Portfolio Yang Lu Punya</h1>
            </div>
            <div>
                <label htmlFor="label description" className='font-normal pl-1 text-button-primary'>
                    Record individual mutual fund ownership
                </label>
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
                    <SectionCardAgg />
                </div>
                <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                    <SectionCardPortfolio />
                </div>
            </div>
        </div>
    )
}

export default TabReksadana
