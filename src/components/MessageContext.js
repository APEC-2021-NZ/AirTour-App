import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import socketIOClient from 'socket.io-client'
import { AuthContext } from './AuthProvider'
import { ToastContext } from './shared/ToastProvider'

export const MessageContext = createContext()

const ENDPOINT = 'http://localhost:3001' // 'https://airtour.herokuapp.com/'

const MessageProivider = ({ children }) => {
    const [socket, setSocket] = useState()
    const [listener, setListener] = useState()
    const [current, setCurrent] = useState('')
    const history = useHistory()

    const { showToast } = useContext(ToastContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const socketIO = socketIOClient(ENDPOINT, {
            query: {
                conversation: [],
            },
        })
        socketIO.on('message', ({ conversation, message }) => {
            console.log(conversation, message)
            if (current === conversation && !listener) {
                listener(message)
                return
            }

            showToast({
                onWillDismiss: () => history.push(`/Chat/${conversation}`),
                message: message,
                color: 'primary',
                position: 'top',
            })
        })

        setSocket(socketIO)
    }, [])

    const send = (conversation, message) => {
        socket.emit('message', { conversation, message })
    }

    const join = (conversation) => {
        socket.emit('join', { conversation })
    }

    useEffect(() => {
        if (!socket) {
            return
        }
        user?.conversations?.map((conversation) => join(conversation.id))
    }, [user, join, socket])

    return (
        <MessageContext.Provider
            value={{
                send,
                join,
                setListener,
                setCurrent,
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProivider
