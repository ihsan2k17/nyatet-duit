import { Metadata } from 'next'
import PortfolioMobile from '../../../module/portfolio/presentation/ui/pages/mobile'
import PortfolioDesktop from '../../../module/portfolio/presentation/ui/pages/desktop'
import { headers } from 'next/headers'

export const metadata: Metadata ={
    title:"Portfolio | Nyatet-Duit"
}
const Portfolio = async () => {
    const headersList =await headers();
    
        const name = headersList.get("x-name");
        const username = headersList.get("x-username");
    return (
        <div>
            <div className="block md:hidden">
                <PortfolioMobile name={name} username={username}/>
            </div>

            <div className="hidden md:block">
                <PortfolioDesktop name={name} username={username}/>
            </div>
        </div>
    )
}

export default Portfolio
