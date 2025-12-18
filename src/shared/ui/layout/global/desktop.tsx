'use client'

import React from 'react'
import Navbar from './navbar'

const DesktopLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <section 
            className={`
                flex flex-col
                relative
                min-h-screen justify-center items-center
                bg-[url('/assets/image/bg.jpg')] 
                bg-no-repeat bg-cover bg-center`}>
            <div className={` absolute inset-0 h-full bg-primary opacity-60 `}/>
            <nav className='h-16 w-full sticky top-0 z-50'>
                <Navbar />
            </nav>
            <main className='flex h-screen'>{children}</main>
        </section>
    )
}

export default DesktopLayout
