import { AuthProvider } from '@/context/AuthContext'
import UserLayout from '@/layout/UserLayout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  )
}
