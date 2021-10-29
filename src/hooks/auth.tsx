import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
    REDIRECT_URI, 
    SCOPE, 
    RESPONSE_TYPE, 
    CLIENTE_ID, 
    CDN_IMAGE,
} from '../config/discord-auth'

import { api } from '../services/api'
import { COLLECTION_USER, COLLECTION_APPOINTMENTS } from '../config/database'

type User = {
    id: string
    username: string
    firstName: string
    avatar: string
    email: string
    token: string
}
type AuthContextData = {
    user: User
    loading: boolean
    signIn: () => Promise<void>
    signOut: () => Promise<void>
}
type AuthProviderProps = {
    children: ReactNode
}
type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string
        error?: string
    }
}
export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)

    async function signIn() {
        try {
            setLoading(true)
            const authURL = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENTE_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
            const { type, params } = await AuthSession.startAsync({ authUrl: authURL }) as AuthorizationResponse
            
            if(type === 'success' && !params.error) {
                api.defaults.headers.common['authorization'] = `Bearer ${params.access_token}`

                const userInfo = await api.get('/users/@me')
                const firstName = userInfo.data.username.split(' ')[0]
                const userData = {
                    ...userInfo.data,
                    firstName,
                    avatar: `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`,
                    token: params.access_token,
                }
                await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData))
                setUser(userData)
            }
        }catch(error) {
            throw new Error('Não foi possível autenticar')
        }finally {
            setLoading(false)
        }
    }

    async function signOut() {
        setUser({} as User)
        await AsyncStorage.removeItem(COLLECTION_USER)
    }
    
    async function loadStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USER)

        if(storage) {
            const userLogged: User = JSON.parse(storage)
            api.defaults.headers.common['authorization'] = `Bearer ${userLogged.token}`
            setUser(userLogged)
        }
    }
    useEffect(() => {
        loadStorageData()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { useAuth, AuthProvider }
