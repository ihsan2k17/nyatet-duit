'use client'
import React from 'react'
import { useLottie } from 'lottie-react'
import loadingPaperlane from '../../../../../public/assets/gif/json/Loading40_Paperplane.json'

const LoadingComponent = () => {
  const loadingStyle = {
    width: '100%',
    height: '100%',
  }

  const loadingAnimation = {
    animationData: loadingPaperlane,
    loop: true,
    autoplay: true,
  }

  const { View } = useLottie(loadingAnimation, loadingStyle)

  return (
    <div className="min-h-dvh w-full bg-gray-200 cursor-none">
      <div className="relative flex min-h-dvh flex-col items-center justify-center">
        
        {/* Lottie */}
        <div className="w-40 sm:w-52 md:w-64 lg:w-72">
          {View}
        </div>

        {/* Text */}
        <div
          className="
            flex flex-row font-sans font-black text-button-primary
            text-2xl
            sm:text-3xl
            md:text-4xl

            mt-4
            md:absolute md:bottom-10
            space-x-1
          "
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
