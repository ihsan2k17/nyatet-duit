'use client'

import SectionCard from "./section.card"

const PortfolioDesktop = () => {
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
                    <SectionCard />
                </div>
            </div>
        </div>
    )
}

export default PortfolioDesktop
