'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { FaRegCircleCheck,FaCircleInfo  } from "react-icons/fa6";
import { FiXCircle } from "react-icons/fi";
type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextProps {
  toast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextProps | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (type: ToastType, message: string) => {
    const id = crypto.randomUUID()//Date.now()
    setToasts(prev => [...prev, { id, type, message }])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const iconMap = {
    success: <FaRegCircleCheck className="h-5 w-5 text-green-600" />,
    error: <FiXCircle className="h-5 w-5 text-red-600" />,
    info: <FaCircleInfo className="h-5 w-5 text-blue-600" />,
  }

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-1000 flex flex-col gap-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className="
              flex items-start gap-3
              w-[320px]
              rounded-lg border
              bg-button-primary
              p-4
              shadow-lg
              animate-in slide-in-from-top-2 fade-in
            "
          >
            {iconMap[t.type]}

            <div className="flex-1 text-sm text-text-invert">
              {t.message}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')

  return {
    success: (msg: string) => ctx.toast('success', msg),
    error: (msg: string) => ctx.toast('error', msg),
    info: (msg: string) => ctx.toast('info', msg),
  }
}
