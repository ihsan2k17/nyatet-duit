'use client'

import { useEffect } from 'react'

const HiddenScroll = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
        }
    },[])
    return null
}

export default HiddenScroll
