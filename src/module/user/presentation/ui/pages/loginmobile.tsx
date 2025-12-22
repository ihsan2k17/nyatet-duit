'use client'
import { useState } from 'react'
import FormLogin from '../components/mobile/form.login'
import FormRegister from '../components/mobile/form.register'
import { fetchLogin } from '../../api/login.client'
import { useRouter } from 'next/navigation'
import SuccessMobile from '@/shared/ui/components/modal/mobile/success'
import ErrorMobile from '@/shared/ui/components/modal/mobile/error'
import { capitalize } from '@/shared/utils/capitalize'
import { fetchRegister } from '../../api/register.client'
import GoogleLogin from '@/shared/hooks/useLoginGoogle'


const LoginMobile = () => {
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

    const [loggedUser, setLoggedUser] = useState<{
        username?: string,
        name?: string
    } | null >(null)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        const user = await fetchLogin(username, password)
        if (user.status) {
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
            setModalType("error")
            setError(res.message!)
            setLoading(false)
            return
        }
        setModal(true)
        setModalType("success")
        setLoading(false)
    }   

    const renderModal = () => {
        if(!modal) return null
        if(modalChoice === "login" && modalType === "error") {
            return (
                <ErrorMobile
                    show={modal}
                    onConfirm={() => {
                        setModal(false)
                    }}
                    Message={`Lu salah masukin Username '${username}', atau salah masukin Password 😒, set Info: ${error}`}
                    title={`${capitalize(modalType)} ${capitalize(modalChoice)}`} 
                    confirmTitleButton={'Back'} 
                />
            )
        } else if(modalChoice === "login" && modalType === "success") {
            return (
                <SuccessMobile 
                    show={modal}
                    onConfirm={() => {
                        setModal(false)
                        router.push("/home")
                    }}
                    Message={`Selamat datang kembali ${capitalize(loggedUser?.name ?? "No Name")} 😎, 
                    pasti abis Masukin duit tabungan/portfolio di real life kan wkwkwk!!!`}
                    title={`${capitalize(modalType)} ${capitalize(modalChoice)}`} 
                    confirmTitleButton={"Okeee!!"} 
                />
            )
        } else if (modalChoice === "register" && modalType === "error") {
            return (
                <ErrorMobile
                    show={modal}
                    onConfirm={() => {
                        setModal(false)
                    }}
                    Message={`set Info: ${error}`}
                    title={`${capitalize(modalType)} ${capitalize(modalChoice)}`} 
                    confirmTitleButton={'Back'} 
                />
            )
        } else if (modalChoice === "register" && modalType === "success") {
            return (
                <SuccessMobile 
                    show={modal}
                    onConfirm={() => {
                        setModal(false)
                        setOpenRegis(false)
                    }}
                    Message={`Anjay Subsrcibe baruu!!. Selamat datang di sistem kita brokkk. ${capitalize(username)}`}
                    title={`${capitalize(modalType)} ${capitalize(modalChoice)}`}
                    confirmTitleButton={"Okeee!!"}
                />
            )
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

export default LoginMobile
