import React from 'react'

interface DrawerModalProps {
    children: React.ReactNode
    onClose: () => void
    isOpen: boolean
}

const DrawerModal = ({ children, onClose, isOpen }: DrawerModalProps) => {
    return (
        <>
            {/* overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            ></div>

            {/* drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-card-primary p-5
                    transform transition-transform duration-300 z-50
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </>
    )
}

export default DrawerModal
