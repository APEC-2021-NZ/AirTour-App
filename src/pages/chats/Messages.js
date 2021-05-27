import { useQuery } from '@apollo/client'
import {
    Avatar,
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
} from '@chatscope/chat-ui-kit-react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { IonLoading } from '@ionic/react'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { MessageContext } from '../../components/MessageContext'
import { ConversationQuery } from '../../graphql/queries/conversation'
import noImage from '../../images/no-image.jpg'

const MessageConverter = ({ userID, message }) => {
    const { from, content, created } = message
    const [image, setImage] = useState(from?.image?.uri)

    const onError = () => {
        setImage(noImage)
    }

    if (from.id === userID) {
        return (
            <Message
                id={message.id}
                model={{
                    message: content,
                    sentTime: moment(created).fromNow(),
                    sender: from.firstname,
                    direction: 'outgoing',
                    position: 'single',
                }}
            />
        )
    }

    return (
        <Message
            id={message.id}
            model={{
                message: content,
                sentTime: moment(message).fromNow(),
                sender: from.firstname,
                direction: 'incoming',
                position: 'single',
            }}
        >
            <Avatar onError={onError} src={image} />
        </Message>
    )
}

const Messages = () => {
    const { conversationID } = useParams()
    const { data, loading } = useQuery(ConversationQuery, {
        variables: {
            conversationID: conversationID,
            limit: 1000,
            offset: 0,
        },
    })

    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const { setListener, setCurrent, send } = useContext(MessageContext)

    const receiveMessage = (message) => {
        if (!message) {
            return
        }
        setMessages([...messages, message])
    }

    const conversation = data?.conversation

    useEffect(() => {
        setListener(receiveMessage)
        setCurrent(conversation?.id)
        return () => {
            setListener()
            setCurrent()
        }
    }, [conversation])

    useEffect(() => {
        if (!conversation || !conversation.message) {
            return
        }
        console.log(conversation.messages)
        setMessages([...conversation.messages].reverse())
    }, [conversation])

    if (loading || !conversation) {
        return <IonLoading isOpen />
    }

    console.log(messages)

    const userID = conversation.user.id
    const guideID = conversation.guide.id
    return (
        <MainContainer style={{ border: 0 }}>
            <ChatContainer>
                <MessageList>
                    {messages.map((message) => (
                        <MessageConverter
                            key={message.id}
                            userID={userID}
                            guideID={guideID}
                            message={message}
                        />
                    ))}
                </MessageList>
                <MessageInput
                    value={value}
                    onChange={(e) => setValue(e)}
                    onSend={() => {
                        send(conversation.id, {
                            from:
                                userID === conversation.user.id
                                    ? conversation.user.id
                                    : conversation.guide.id,
                            content: value,
                            created: new Date(),
                        })
                    }}
                    attachButton={false}
                    placeholder="Type message here"
                />
            </ChatContainer>
        </MainContainer>
    )
}

export default Messages
