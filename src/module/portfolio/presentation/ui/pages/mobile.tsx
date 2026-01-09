'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import TabReksadana from "../components/mobile/tab.reksadana"
import { FaChartBar, FaLeaf } from "react-icons/fa6"

interface Props {
    name?:string|null,
    username?:string|null
}
const PortfolioMobile = ({name, username}:Props) => {
    const [hidden, setHidden] = useState(false)
    const [lastScroll, setLastScroll] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState("reksadana")
    const [direction, setDirection] = useState(1)
    useEffect(() => {
        const handleScroll = () => {
        const container = scrollContainerRef.current
        if (!container) return
        const currentScroll = container.scrollTop

        if (currentScroll > lastScroll + 5) {
            setHidden(true) // scroll ke bawah → hide
        } else if (currentScroll < lastScroll - 5) {
            setHidden(false) // scroll ke atas → show
        }

        setLastScroll(currentScroll)
        }

        const container = scrollContainerRef.current
        container?.addEventListener('scroll', handleScroll, { passive: true })

        return () => container?.removeEventListener('scroll', handleScroll)
    }, [lastScroll])
    const variants = {
        enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        }),
        center: {
        x: 0,
        opacity: 1,
        },
        exit: (direction: number) => ({
        x: direction > 0 ? -100 : 100,
        opacity: 0,
        }),
    }
    return (
        <div
            ref={scrollContainerRef}
            className="w-full h-screen overflow-auto relative"
            >
            {/* Konten */}
            <AnimatePresence mode="wait" custom={direction}>   
                <div className="pt-2 w-full px-2">
                    {activeTab === 'reksadana' && (
                    <motion.div 
                        key="reksadana"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{duration:0.25, ease: 'easeInOut'}}>
                            <TabReksadana activeTab={activeTab} name={name} username={username}/>
                    </motion.div>
                    )}

                    {activeTab === 'saham' && (
                    <motion.div
                        key="saham"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{duration:0.25, ease: 'easeInOut'}}>
                        <div className="flex flex-col items-center justify-center h-full py-10 bg-green-100 rounded-lg shadow">
                            <p className="text-green-700 font-semibold text-lg">Content Tab Saham</p>
                        </div>
                    </motion.div>
                    )}
                </div>
            </AnimatePresence>
            {/* Spacer supaya konten terakhir gak ketutup */}
            <div className="h-20"></div>

            {/* Bottom Bar */}
            <div
                className={`
                    fixed 
                    bottom-0 
                    flex 
                    justify-center 
                    items-center 
                    w-full pb-4 p-2
                    transition-transform duration-300 ${
                hidden ? 'translate-y-full' : 'translate-y-0'
                }`}
            >
                <div className='flex flex-row bg-white rounded w-full'>
                    <button 
                        onClick={() => {
                            setDirection(-1) 
                            setActiveTab("reksadana")}}
                        className={`flex flex-1 items-center justify-center p-2 text-center cursor-pointer rounded
                            ${activeTab === "reksadana" ? 
                                "border-2 bg-button-primary text-white font-bold rounded":
                                "text-button-primary font-bold"}`}>
                        <FaLeaf className="mr-5 size-4"/> Reksadana 
                    </button>
                    <button
                        onClick={() => {
                            setDirection(1)
                            setActiveTab("saham")}}
                        className={`flex flex-1 items-center justify-center p-2 text-center cursor-pointer rounded
                            ${activeTab === "saham" ? 
                                "border-2 bg-button-primary text-white font-bold rounded":
                                "text-button-primary font-bold"}`}>
                            <FaChartBar className="mr-5 size-4"/>Saham 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PortfolioMobile
