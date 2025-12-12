'use client'
import React from 'react'
import {useLottie} from 'lottie-react'
import useIsMobile from '../hooks/useIsMobile'
import loadingPaperlane from '../../../public/assets/gif/json/Loading40_Paperplane.json'

const LoadingComponent = () => {
    const isMobile = useIsMobile()
    const loadingStyle = {
        width:"100%",
        heiht:"100%"
    }
    const loadingAnimation = {
        animationData:loadingPaperlane,
        loop:true,
        autoplay: true
    }
    const {View} = useLottie(loadingAnimation, loadingStyle)
    return (
        <div className={`h-screen w-full bg-gray-200 cursor-none`}>
            <div className={`flex flex-col relative h-screen items-center justify-center`}>
                {View}
                <div
                className={`
                    flex font-sans font-black text-button-primary
                    ${isMobile 
                    ? "flex-row items-center text-2xl relative" 
                    : "flex-row space-x-1 text-4xl absolute bottom-10"}
                `}
                >
                    <span>Loading</span>
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce [animation-delay:200ms]">.</span>
                    <span className="animate-bounce [animation-delay:400ms]">.</span>
                </div>
            </div>
        </div>
    )
}

export default LoadingComponent
