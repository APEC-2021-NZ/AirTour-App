import firebase from 'firebase/app'
import React, { useState } from 'react'
import AuthModal from './shared/AuthModal'

const AuthContext = React.createContext()

const Auth = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    const handleClose = () => {
        if (!firebase.auth().currentUser) {
            localStorage.setItem('dismissAuth', 'true')
        }
        setOpen(false)
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setOpen(false)
            setAuthenticated(true)
        } else if (!localStorage.getItem('dismissAuth')) {
            localStorage.removeItem('dismissAuth')
            setOpen(true)
            setAuthenticated(false)
        }
    })

    const contextValue = {
        showModal: () => setOpen(true),
        isAuthenticated: authenticated,
        logout: () => firebase.auth().signOut(),
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
            <AuthModal open={open} onClose={handleClose} />
        </AuthContext.Provider>
    )
}

export { AuthContext }
export default Auth
