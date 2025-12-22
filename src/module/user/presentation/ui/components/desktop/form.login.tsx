'use client'
import { Button } from '@/shared/ui/components/button/button'
import { Card, CardContent } from '@/shared/ui/components/card/card'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/components/field/field'
import { Input } from '@/shared/ui/components/input/input'
import Image from 'next/image'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import image from "../../../../../../../public/assets/icon/paper-plane-freepik.png"

interface props {
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    password: string
    setPassword:Dispatch<SetStateAction<string>>
    setOpenRegis: Dispatch<SetStateAction<boolean>>
    loading:boolean
    onSubmit?: () => void
    googleLogin?: () => void
}
const FormLogin = ({username, setUsername, password, setPassword, setOpenRegis, loading, onSubmit, googleLogin}:props) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(onSubmit) {
            onSubmit()
        }
    }
    return (
        <div className='flex flex-1 w-full justify-center items-center'>
            <Card className='overflow-hidden p-0 w-full bg-card-secondary/70 border-0'>
                <CardContent className="grid p-0 grid-cols-2 h-full">
                    <form className="
                        py-8 px-6
                        sm:px-8
                        md:px-12
                        lg:px-20
                        xl:px-32
                        bg-card-primary/80
                        " onSubmit={handleSubmit}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Sign in To Your Account</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                Enter your email below to create your account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor='username'>Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="moSalah"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline hover:font-semibold"
                                    >
                                    Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type='submit' disabled={loading}>{loading ? "Waiting..." : "Sign In"}</Button>
                            </Field>
                            <FieldSeparator>
                                Or Continue with
                            </FieldSeparator>
                            <Field>
                                <Button variant="destructive" type='button' onClick={googleLogin}>
                                    <FaGoogle />
                                    Sign in With Google
                                </Button>
                                <FieldDescription className={`text-center`}>
                                    don&apos;t have an Account ?{" "}
                                    <a onClick={() => setOpenRegis(true)} 
                                    className='underline underline-offset-4 cursor-pointer hover:font-bold'>Sign Up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                    <div className='relative flex flex-1 justify-center items-center'>
                        <Image src={image} alt="Icon Menu" fill className='object-contain' priority />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FormLogin
