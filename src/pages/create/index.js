import api from "@/config/api"
import auth from "@/config/auth"
import axios from "axios"
import { Button, FileInput, TextInput, Textarea } from "flowbite-react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

const index = () => {
    const router = useRouter()
    const token = localStorage.getItem(auth.storageTokenKeyName)

    const defaultValues = {
        title: '',
        description: '',
        attachment: null
    }

    const onSubmit = async (input) => {
        console.log(input)
        const formData = new FormData()
        formData.append('title', input.title)
        formData.append('description', input.description)
        formData.append('attachment', input.attachment[0])
        await axios.post(api.apiNotes, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response)
                router.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div>
                <label htmlFor="title">Title</label>
                <TextInput id="title" {...register('title')} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <Textarea id="description" {...register('description')} />
            </div>
            <div>
                <FileInput {...register('attachment')}/>
            </div>
            <Button type="submit">Save</Button>
        </form>
    )
}

export default index