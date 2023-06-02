import { set } from "react-hook-form"

const { default: auth } = require("@/config/auth")
const { default: axios } = require("axios")
const { useRouter } = require("next/router")
const { createContext, useState, useEffect } = require("react")

const defaultProvider = {
    user: null,
    setUser: () => { },
    loading: true,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        console.log('init auth')
        const initAuth = async () => {
            const storedToken = window.localStorage.getItem(auth.storageTokenKeyName)
            if (storedToken) {
                await axios.get(auth.getMe, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                    .then((response) => {
                        setUser({ ...response.data.user })
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error)
                        router.replace('/login')
                        localStorage.removeItem(auth.storageTokenKeyName)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                setLoading(false)
            }
        }
        initAuth()
    }, [])

    const handleLogin = async (input, errorCallback) => {
        setLoading(true)
        await axios.post(auth.loginUrl, input)
            .then((response) => {
                console.log(response)
                setUser({ ...response.data.user })
                window.localStorage.setItem(auth.storageTokenKeyName, response.data.token)
                router.replace('/')
            })
            .catch((error) => {
                console.log(error)
                if (errorCallback) errorCallback("error")
            }).finally(() => {
                setLoading(false)
            })
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem(auth.storageTokenKeyName)
        router.reload('/login')
    }

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }