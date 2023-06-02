import navigation from "@/navigation/navigation"
import Link from "next/link"
import { useRouter } from "next/router"

const Navbar = () => {
    const router = useRouter()
    return (
        <nav className="w-full py-5">
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
        </nav>
    )
}

export default Navbar