import styles from "@/config/style"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "@/views/components/Navbar"
import { useRouter } from "next/router"

const UserLayout = ({ children }) => {
    const authContext = useAuth()
    const router = useRouter()

    const { user, loading } = authContext

    if (!loading && !user && router.pathname !== '/login' && typeof window !== 'undefined') {
        router.replace('/login')
        return
    }

    return (
        <div className={`w-full ${styles.flexCenter} flex-col`}>
            {!loading && user && (
                <div className={`w-full bg-slate-200 ${styles.flexCenter}`}>
                    <div className={`${styles.paddingX} ${styles.boxContent}`}>
                        <Navbar />
                    </div>
                </div>
            )}
            <main className="w-full">
                {loading && <div>Loading</div>}
                {!loading && <div className={`${styles.paddingX} ${styles.paddingY} ${styles.boxContent}`}>
                    {children}
                </div>}
            </main>
        </div>
    )
}

export default UserLayout