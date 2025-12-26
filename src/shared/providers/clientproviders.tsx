'use client'
import React from 'react'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from '../ui/components/toast/toast';

const ClientProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </GoogleOAuthProvider>
    )
}

export default ClientProviders
