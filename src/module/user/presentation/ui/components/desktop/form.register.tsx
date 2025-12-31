'use client'
import { Button } from '@/shared/ui/components/button/button'
import { Card, CardContent } from '@/shared/ui/components/card/card'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/components/field/field'
import { Input } from '@/shared/ui/components/input/input'
import { passwordRegex } from '@/shared/utils/passwordregex'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import Image from 'next/image'
import image from "../../../../../../../public/assets/icon/paper-plane-freepik.png"
import { useLottie } from 'lottie-react'
import Login from '../../../../../../../public/assets/gif/json/LoginAnimation.json'

interface props {
    username:string
    setUsername: Dispatch<SetStateAction<string>>
    name:string
    setName: Dispatch<SetStateAction<string>>
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    password: string
    setPassword:Dispatch<SetStateAction<string>>
    confirmPassword: string
    setConfirmPassword:Dispatch<SetStateAction<string>>
    setOpenRegis: Dispatch<SetStateAction<boolean>>
    loading:boolean
    onSubmit: () => void
}

const FormRegister = ({
    username,
    setUsername,
    name,
    setName,
    email, setEmail, 
    password, setPassword, 
    confirmPassword, setConfirmPassword, 
    setOpenRegis,
    loading, onSubmit}:props) => 
{
    const passwordValid = passwordRegex.test(password)
    const checkPassword = password.length >= 8 && !passwordValid
    const matchPassword = confirmPassword.length > 0 && password !== confirmPassword
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(onSubmit) {
            onSubmit()
        }
    }
    const planeStyle = {
        width: "100%",
        height: "100%"
    }
    const planeAnimation = {
        animationData: Login,
        loop: true,
        autoplay: true,
    }
    const View1 = useLottie(planeAnimation, planeStyle )
    return (
        <div className='flex flex-1 w-full justify-center items-center'>
            <Card className={`overflow-hidden p-0 w-full bg-card-secondary/70 border-0`}>
                <CardContent className="grid p-0 grid-cols-[60%_40%] h-full">
                    <form className="py-3 px-4 lg:py-6 lg:px-8 bg-card-primary/80" onSubmit={handleSubmit}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Create your account</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                Fill in the form below to create your account
                                </p>
                            </div>
                            <div className='flex flex-1 flex-row gap-10'>
                                <Field>
                                    <FieldLabel htmlFor='username'>Username</FieldLabel>
                                    <Input 
                                        id='username'
                                        type='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Sigan.Shina'
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor='name'>Name</FieldLabel>
                                    <Input 
                                        id='name'
                                        type='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Sigan Shina'
                                        required
                                    />
                                </Field>
                            </div>
                            <div className='flex flex-1 flex-row gap-10'>
                                <Field>
                                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="m@example.com"
                                        required
                                    />
                                </Field>
                                <Field></Field>
                            </div>  
                            <div className='flex flex-1 flex-row gap-10'>
                                <div className='flex flex-col w-full'>
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            aria-invalid = {checkPassword}
                                            required
                                        />
                                        {checkPassword && (
                                            <FieldDescription>
                                                Must be at least 8 characters long.
                                            </FieldDescription>
                                        )}
                                    </Field>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Password"
                                            aria-invalid ={matchPassword}
                                            required
                                        />
                                    </Field>
                                    {matchPassword && (
                                        <FieldDescription>
                                            Please Check your Confirm Password.
                                        </FieldDescription>
                                    )}
                                </div>
                            </div>
                            <Field>
                                <Button 
                                    type='submit' 
                                    disabled={loading}>{loading ? "Waiting..." : "Create Account"}</Button>
                                </Field>
                                <FieldSeparator>
                                    Or Continue with
                                </FieldSeparator>
                                <Field>
                                    <Button variant="destructive" type='button'>
                                        <FaGoogle />
                                        Sign Up With Google
                                    </Button>
                                    <FieldDescription className={`text-center`}>
                                        Aleready have an Account?{" "}
                                        <a onClick={() => setOpenRegis(false)} 
                                            className='underline underline-offset-4 cursor-pointer hover:font-bold'>Sign In</a>
                                    </FieldDescription>
                                </Field>
                        </FieldGroup>
                    </form>
                    <div className='relative flex justify-center items-center h-full'>
                        {View1 ? 
                            <div className='w-full h-full'>{View1.View}</div>
                        :<Image src={image} alt="Icon Menu" fill className='object-contain' priority />}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FormRegister
