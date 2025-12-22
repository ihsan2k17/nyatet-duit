'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { fetchLogin } from '../../api/login.client'
import FormLogin from '../components/desktop/form.login'
import FormRegister from '../components/desktop/form.register'
import { fetchRegister } from '../../api/register.client'
import ErrorDesktop from '@/shared/ui/components/modal/desktop/error'
import { capitalize } from '@/shared/utils/capitalize'
import Success from '@/shared/ui/components/modal/desktop/success'
import GoogleLogin from '@/shared/hooks/useLoginGoogle'

const LoginDesktop = () => {
    type modalsType = "error" | "success" | "warning" | null 
    type modalsChoice = "login" | "register" | null
    const [username, setUsername] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [openRegis, setOpenRegis] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalChoice, setModalChoice] = useState<modalsChoice>(null)
    const [modalType, setModalType] = useState<modalsType>(null)
    const [error, setError] = useState<string|null>(null)
    const router = useRouter()

    const [loggedUser, setLoggedUser] = useState<{
        username?: string,
        name?: string
    } | null >(null)

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        const user = await fetchLogin(username, password)
        if (user.status === true) {
            setLoggedUser({
                username: user.data?.username ?? "No Username",
                name: user.data?.name ?? "No Name"
            })
            setModal(true)
            setModalChoice("login")
            setModalType("success")
        } else {
            setModal(true)
            setModalChoice("login")
            setModalType("error")
            setError(user.message ?? "Login gagal")
        }
        setLoading(false)
    }

    const {googleLogin} = GoogleLogin((res) => {
        if (res.status) {
            setLoggedUser({
                username: res.data?.username ?? "No Username",
                name: res.data?.name ?? "No Name"
            })
            setModal(true)
            setModalChoice("login")
            setModalType("success")
        } else {
            setModal(true)
            setModalChoice("login")
            setModalType("error")
            setError(res.message ?? "Login Google Failed")
        }
    })
    
    const handleRegister = async () => {
        setLoading(true)
        setError("")
        const res = await fetchRegister(
            username, password, email, name
        )
        if(res.status === false) {
            setModal(true)
            setModalChoice("register")
            setModalType("error")
            setError(res.message!)
            setLoading(false)
        }
        setModal(true)
        setModalChoice("register")
        setModalType("success")
        setLoading(false)
    }   

    const renderModal = () => {
        if (!modal) return null
        if (modalChoice === "register" && modalType === "error") {
            return (
            <ErrorDesktop
                show={modal}
                onClose={() => setModal(false)}
                onConfirm={() => setModal(false)}
                Message={error!}
                pbutton="Back"
                title={`${capitalize(modalType)} ${capitalize(modalChoice)}`}
            />
            )
        }

        if (modalChoice === "register" && modalType === "success") {
            return (
                <Success
                    show={modal}
                    onClose={() => {
                        setModal(false)
                        setOpenRegis(false)
                    }}
                    onConfirm={() => {
                        setModal(false)
                        setOpenRegis(false)
                    }}
                    Message={`Anjay Subscribe baruu!! 😄 Selamat datang ${username}`}
                    pbutton="Gass"
                    title={`${capitalize(modalType)} ${capitalize(modalChoice)}`}
                />
            )
        }

        if(modalChoice === "login" && modalType === "error") {
            return (
                <ErrorDesktop
                    show={modal}
                    onClose={() => setModal(false)}
                    onConfirm={() => setModal(false)}
                    Message={`Lu salah masukin Username '${username}', atau salah masukin Password 😒, set Info: ${error}`}
                    pbutton="Back"
                    title={`${capitalize(modalType)} ${capitalize(modalChoice)}`}
                />
            )
        }

        if(modalChoice === "login" && modalType === "success") {
            return (
                <Success
                    show={modal}
                    onClose={() => {
                        setModal(false)
                        router.push("/home")
                    }}
                    onConfirm={() => {
                        setModal(false)
                        router.push("/home")
                    }}
                    Message={`Selamat datang kembali ${capitalize(loggedUser?.name ?? "No Name")} 😎, 
                        pasti abis Masukin duit tabungan/portfolio di real life kan wkwkwk!!!`}
                    pbutton="Gass"
                    title={`${capitalize(modalType)} ${capitalize(modalChoice)}`}
                />
            )
        }
    }

    return (
        <div className={`relative flex flex-col min-h-screen
        before:absolute before:inset-0 before:bg-primary before:opacity-75
        bg-[url('/assets/image/bg.jpg')] bg-no-repeat bg-cover bg-center`}>
            <div className='relative flex flex-col flex-1 justify-center items-start 
                px-4 py-0
                lg:px-40 lg:py-16'>
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
                    setOpenRegis={setOpenRegis}
                    loading={loading}
                    onSubmit={handleRegister}/>
                ):(
                    <FormLogin 
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        setOpenRegis={setOpenRegis}
                        loading={loading}
                        onSubmit={handleLogin}
                        googleLogin={() => googleLogin()}/>
                    )
                }
                {renderModal()}
            </div>
        </div>
    )
}

export default LoginDesktop
