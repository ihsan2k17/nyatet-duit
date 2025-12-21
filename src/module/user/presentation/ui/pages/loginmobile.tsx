'use client'
import React, { useState } from 'react'
import FormLogin from '../components/mobile/form.login'
import FormRegister from '../components/mobile/form.register'
import { fetchLogin } from '../../api/login.client'
import { useRouter } from 'next/navigation'

const LoginMobile = () => {
    const [username, setUsername] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [openRegis, setOpenRegis] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string|null>(null)
    const router = useRouter()
    const handleLogin = async () => {
        const user = await fetchLogin(username, password, (msg) => setError(msg as string), setLoading)
        if (user) {
            console.log("Login sukses:", user)
            // contoh: simpan token / redirect
            router.push("/home")
        }
    }
    return (
        <div className={`flex flex-1 min-h-screen relative
            before:absolute before:inset-0 before:bg-primary before:opacity-75 before:pointer-events-none
            bg-[url('/assets/image/bg.jpg')] bg-no-repeat bg-cover bg-center`}>
            <div className='flex flex-col flex-1 justify-center items-start p-2 mt-2'>
                {openRegis ? (<FormRegister 
                    username={username}
                    setUsername={setUsername}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    setOpenRegis={setOpenRegis}/>
                ):(
                    <FormLogin 
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        setOpenRegis={setOpenRegis}
                        loading={loading}
                        onSubmit={handleLogin}/>
                    )
                }
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    )
}

export default LoginMobile
