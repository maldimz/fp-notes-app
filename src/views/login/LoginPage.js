import { useAuth } from "@/hooks/useAuth"
import { TextInput } from "flowbite-react"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

const LoginPage = () => {
    const authContext = useAuth()
    const { login } = authContext

    const defaultValues = {
        username: '',
        password: ''
    }

    const onSubmit = useCallback(async (data) => {
        console.log(data)
        
        login(data, (error) => {
            console.log(error)
        })
      }, [])

    const {
        register,
        handleSubmit
    } = useForm({ defaultValues })

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-sm flex flex-col gap-2">
                LoginPage
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Username</label>
                        <TextInput required {...register('username')} id="username" placeholder="isi username anda" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <TextInput required {...register('password')} type="password" id="password" placeholder="isi password anda" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage