'use client'
import { ReactNode } from "react"
import useIsMobile from "../hooks/useIsMobile"

interface ResponsiveProps {
    Mobile? : ReactNode,
    Desktop? :ReactNode
}

const Responsive = ({Mobile, Desktop}:ResponsiveProps) => {
    const isMobile = useIsMobile()
    return <> {isMobile ? Mobile : Desktop} </>
}

export default Responsive
