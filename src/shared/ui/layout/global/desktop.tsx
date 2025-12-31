'use client'

import React from 'react'
import Navbar from './navbar'
import { useLottie } from 'lottie-react'
import paperplane from "../../../../../public/assets/gif/json/Airplane Lottie Animation.json"

const DesktopLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    const tgl = new Date()
    const datenow = tgl.getFullYear().toString()
    const planeStyle = {
        width: "100%",
        height: "100%"
    }
    const planeAnimation = {
        animationData: paperplane,
        loop: true,
        autoplay: true,
    }
    const View1 = useLottie(planeAnimation, planeStyle )
    const View2 = useLottie(planeAnimation, planeStyle)
    
    return (
        <section className={`
            relative flex flex-col min-h-screen 
            before:absolute before:inset-0 before:bg-primary before:opacity-75
            bg-[url('/assets/image/bg.jpg')] bg-no-repeat bg-cover bg-center`}>
            <header className='w-full'>
                <nav className='h-16 sticky top-0 z-100'>
                    <Navbar />
                </nav>
            </header>
            <main className="flex-1 relative w-full flex flex-col min-h-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute right-0 bottom-0 h-screen">{View1.View}</div>
                    <div className="absolute right-0 bottom-10 h-1/2">{View2.View}</div>
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
                    {children}
                </div>
            </main>
            <footer className="h-12 text-center py-3 z-100">
                <label className="text-md text-button-primary font-bold">
                    Powered by Nextjs, Freepik and Supabase © {datenow}
                </label>
            </footer>
        </section>
    )
}

export default DesktopLayout
