import firebase from 'firebase/app'
import React, { useState } from 'react'
import AuthModal from './shared/AuthModal'

const AuthContext = React.createContext()

const Auth = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState({})

    const handleClose = () => {
        if (!firebase.auth().currentUser) {
            localStorage.setItem('dismissAuth', 'true')
        }
        setOpen(false)
    }

    firebase.auth().onAuthStateChanged((userDoc) => {
        if (userDoc) {
            setOpen(false)
            setAuthenticated(true)
            setUser(userDoc)
        } else if (!localStorage.getItem('dismissAuth')) {
            localStorage.removeItem('dismissAuth')
            setOpen(true)
            setAuthenticated(false)
            setUser({})
        }
    })

    const contextValue = {
        showModal: () => setOpen(true),
        isAuthenticated: authenticated,
        logout: () => firebase.auth().signOut(),
        user: user,
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
