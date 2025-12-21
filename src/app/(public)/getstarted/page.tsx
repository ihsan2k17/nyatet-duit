import Responsive from '@/shared/ui/layout'
import MobileGetStarted from './components/mobile'
import DesktopGetStarted from './components/desktop'

const GetStarted = () => {
    return (
        <Responsive 
            Mobile= { <MobileGetStarted/> }
            Desktop = {<DesktopGetStarted/> }/>
        
    )
}

export default GetStarted
