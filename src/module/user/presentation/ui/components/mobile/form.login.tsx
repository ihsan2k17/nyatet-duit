'use client'
import { Button } from '@/shared/ui/components/button/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/components/field/field'
import { Input } from '@/shared/ui/components/input/input'
import { Dispatch, SetStateAction, FormEvent } from 'react'
import { FaGoogle } from "react-icons/fa6";

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
        <form className={`flex flex-col w-full p-2 z-99 bg-card-secondary/70 rounded-4xl`} onSubmit={handleSubmit}>
            <FieldGroup>
                <div className='flex flex-col items-center p-2'>
                    <label className='text-text-primary font-bold text-lg'>
                        Sign in To Your Account
                    </label>
                    <a className='text-text-secondary font-bold text-sm'>
                        Enter your email below to Sign in to your account
                    </a>
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
                            className="ml-auto text-sm underline-offset-4 hover:underline"
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
                        don&apos;t have an Account?{" "}
                        <a onClick={() => setOpenRegis(true)} className='underline underline-offset-4'>Sign Up</a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}

export default FormLogin
