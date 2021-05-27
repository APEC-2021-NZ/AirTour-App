import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import { AuthContext } from './AuthProvider'
import { ToastContext } from './shared/ToastProvider'

export const MessageContext = createContext()

const ENDPOINT = 'http://localhost:3001' // 'https://airtour.herokuapp.com/'

const socketIO = socketIOClient(ENDPOINT, {
    query: {
        conversation: [],
    },
})

const MessageProivider = ({ children }) => {
    const [socket, setSocket] = useState()
    const [current, setCurrent] = useState('')
    const [messages, setMessages] = useState([])
    const history = useHistory()

    const { showToast } = useContext(ToastContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        socketIO.removeAllListeners('message')
        socketIO.on('message', ({ conversation, message }) => {
            console.log('test', conversation, 'test', current)
            if (current === conversation) {
                if (!message) {
                    return
                }
                console.log(message)
                setMessages([...messages, message])
            } else {
                showToast({
                    onClick: () => history.push(`/Chat/${conversation}`),
                    message: message.content,
                    color: 'primary',
                    position: 'top',
                })
            }
        })

        setSocket(socketIO)
    }, [current, messages])

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
                setCurrent,
                messages,
                setMessages,
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProivider
