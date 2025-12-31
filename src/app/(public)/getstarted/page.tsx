import MobileGetStarted from './components/mobile'
import DesktopGetStarted from './components/desktop'

const GetStarted = () => {
    return (
        <div>
            <div className="block md:hidden">
                <MobileGetStarted/>
            </div>

            <div className="hidden md:block">
                <DesktopGetStarted/>
            </div>
        </div>
    )
}

export default GetStarted
