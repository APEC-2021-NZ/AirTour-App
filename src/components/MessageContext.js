import React, { createContext, useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'

export const MessageContext = createContext()

const ENDPOINT = 'https://airtour.herokuapp.com/'

const MessageProivider = ({ children }) => {
    const [socket, setSocket] = useState()
    useEffect(() => {
        const socketIO = socketIOClient(ENDPOINT, {
            query: {
                conversation: [],
            },
        })
        socketIO.on('message', (data) => {})

        setSocket(socketIO)
    }, [])

    const send = (conversation, message) => {
        socket.emit('message', conversation, message)
    }

    const join = (conversation) => {
        socket.emit('join', conversation)
    }

    return (
        <MessageContext.Provider
            value={{
                send,
                join,
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProivider
