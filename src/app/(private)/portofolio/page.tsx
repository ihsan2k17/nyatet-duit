import { Metadata } from 'next'
import PortfolioMobile from '../../../module/portfolio/presentation/ui/pages/mobile'
import PortfolioDesktop from '../../../module/portfolio/presentation/ui/pages/desktop'
export const metadata: Metadata ={
    title:"Portfolio | Nyatet-Duit"
}
const Portfolio = () => {
    return (
        <div>
            <div className="block md:hidden">
                <PortfolioMobile/>
            </div>

            <div className="hidden md:block">
                <PortfolioDesktop/>
            </div>
        </div>
    )
}

export default Portfolio
