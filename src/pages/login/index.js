import BlankLayout from "@/layout/BlankLayout"
import LoginPage from "@/views/login/LoginPage"

const index = () => {
    return (
        <LoginPage />
    )
}

index.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default index