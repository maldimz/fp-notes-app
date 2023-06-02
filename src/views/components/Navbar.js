import { useAuth } from "@/hooks/useAuth"
import navigation from "@/navigation/navigation"
import Link from "next/link"
import { useRouter } from "next/router"

const Navbar = () => {
    const router = useRouter()
    const authContext = useAuth()
    const { logout } = authContext
    return (
        <nav className="w-full py-5 flex flex-row justify-between items-center">
            <ul className="flex flex-row gap-5">
                <li>
                    <Link href={navigation.getAll} className={`cursor-pointer ${router.pathname === navigation.getAll ? 'font-bold' : 'font-normal'}`}>
                        All Notes
                    </Link>
                </li>
                <li>
                    <Link href={navigation.create} className={`cursor-pointer ${router.pathname === navigation.create ? 'font-bold' : 'font-normal'}`}>
                        Create
                    </Link>
                </li>
            </ul>
            <div onClick={logout} className={`cursor-pointer hover:font-bold`}>
                Logout
            </div>
        </nav>
    )
}

export default Navbar