import { Metadata } from 'next'
import PortfolioMobile from './components/mobile'
import PortfolioDesktop from './components/desktop'
export const metadata: Metadata ={
    title:"Login | Nyatet-Duit"
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
