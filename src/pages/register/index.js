import auth from "@/config/auth"
import BlankLayout from "@/layout/BlankLayout"
import axios from "axios"
import { TextInput } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

const index = () => {
    const router = useRouter()
    const defaultValues = {
        username: '',
        password: ''
    }

    const onSubmit = (data) => {
        console.log(data)
        axios.post(auth.registerUrl, data)
            .then((response) => {
                console.log(response)
                router.replace('/login')
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
                    <button type="submit">Register</button>
                </form>
                <Link href={'/login'} >Punya Akun? Login</Link>
            </div>
        </div>
    )
}

index.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default index