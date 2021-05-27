import { useLazyQuery } from '@apollo/client'
import firebase from 'firebase/app'
import { refresh } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { MeQuery } from '../graphql/queries/users'
import AuthModal from './shared/AuthModal'

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [getUser, { data, loading, error }] = useLazyQuery(MeQuery, {
        fetchPolicy: 'no-cache',
    })
    const [open, setOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [refreshCount, setRefreshCount] = useState(0)

    const handleClose = () => {
        if (!firebase.auth().currentUser) {
            localStorage.setItem('dismissAuth', 'true')
        }
        setOpen(false)
    }

    useEffect(() => {
        if (refreshCount) {
            getUser()
        }
    }, [refreshCount])

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((userDoc) => {
            if (userDoc) {
                getUser()
                localStorage.removeItem('dismissAuth')
                setOpen(false)
                setAuthenticated(true)
            } else if (!localStorage.getItem('dismissAuth')) {
                localStorage.removeItem('dismissAuth')
                setOpen(true)
                setAuthenticated(false)
            }
        })
        return () => unsubscribe()
    }, [])

    const contextValue = {
        showModal: () => setOpen(true),
        isAuthenticated: authenticated,
        logout: () => firebase.auth().signOut(),
        user:
            authenticated && data
                ? {
                      ...data.me,
                      wishlist: data.guides.map((g) => g.id),
                  }
                : null,
        refresh: () => setRefreshCount((value) => value + 1),
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
            <AuthModal open={open} onClose={handleClose} />
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default AuthProvider
