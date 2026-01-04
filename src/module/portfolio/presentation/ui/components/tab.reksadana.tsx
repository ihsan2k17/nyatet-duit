'use client'
import SectionCard from './section.card'

interface props {
    activeTab: string
}
const TabReksadana = ({activeTab}:props) => {
    return (
        <div className={`flex flex-1 flex-col ${activeTab === 'reksadana' ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
                    <SectionCard />
                </div>
            </div>
        </div>
    )
}

export default TabReksadana
