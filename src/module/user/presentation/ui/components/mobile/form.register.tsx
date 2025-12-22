'use client'
import { Button } from '@/shared/ui/components/button/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/shared/ui/components/field/field'
import { Input } from '@/shared/ui/components/input/input'
import { passwordRegex } from '@/shared/utils/passwordregex'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { FaGoogle } from 'react-icons/fa6'

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
    loading, onSubmit}:props) => {
        const passwordValid = passwordRegex.test(password)
        const checkPassword = password.length >= 8 && !passwordValid
        const matchPassword = confirmPassword.length > 0 && password !== confirmPassword
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
                        Create Your Account
                    </label>
                    <a className='text-text-secondary font-bold text-sm'>
                        Fill in the form below to create your account
                    </a>
                </div>
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
                <Field>
                    <Button type='submit' disabled={loading}>{loading ? "Waiting..." : "Create Account"}</Button>
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
                        <a onClick={() => setOpenRegis(false)} className='underline underline-offset-4'>Sign In</a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}

export default FormRegister
