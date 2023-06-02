import api from "@/config/api"
import auth from "@/config/auth"
import navigation from "@/navigation/navigation"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [data, setData] = useState([])
  const token = localStorage.getItem(auth.storageTokenKeyName)

  useEffect(() => {
    axios.get(api.apiNotes, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response)
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleRoute = (route) => {
    router.push(route)
  }

  const handleDelete = async (id) => {
    await axios.delete(api.apiNotes + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response)
        setData(data.filter((item) => item.id !== id))
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div class="flex flex-col w-full">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">Id</th>
                  <th scope="col" class="px-6 py-4">Title</th>
                  <th scope="col" class="px-6 py-4">Option</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? data.map((item, index) => (
                  <tr
                    key={index}
                    class="cursor-pointer border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td
                      onClick={() => handleRoute(`${item.id}`)}
                      class="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                    <td
                      onClick={() => handleRoute(`${item.id}`)}
                      class="whitespace-nowrap px-6 py-4">{item.title}</td>
                    <td
                      class="whitespace-nowrap px-6 py-4 flex flex-row gap-2 flex-wrap">
                      <button onClick={() => handleDelete(item.id)} className="bg-red-600 p-2 rounded-lg text-white font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                )) : <tr className="col-span-3">No data</tr>}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
