import React, { useState } from 'react'
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
} from '@chatscope/chat-ui-kit-react'

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import moment from 'moment'
import noImage from '../../images/no-image.jpg'

const data = {
    conversation: {
        id: '1',
        user: { id: '123', name: 'name123' },
        guide: { id: '1', name: 'name1' },
        messages: [
            {
                id: '1',
                from: { id: '123', name: 'name123' },
                content:
                    ' you this is very  this is very this is very very long message i dont know what to type',
                created: new Date(),
            },
            {
                id: '2',
                from: { id: '1', name: 'name1' },
                content: 'Hello world',
                created: new Date(),
            },
            {
                id: '3',
                from: { id: '123', name: 'name123' },
                content: 'No you',
                created: new Date(),
            },
            {
                id: '4',
                from: { id: '123', name: 'name123' },
                content: 'Hello world',
                created: new Date(),
            },
            {
                id: '5',
                from: { id: '1', name: 'name1' },
                content: 'Hello world',
                created: new Date(),
            },
        ],
    },
}

const MessageConverter = ({ userID, message }) => {
    const { from, content, created } = message
    const [image, setImage] = useState(from?.image?.uri)

    const onError = () => {
        setImage(noImage)
    }

    if (from.id === userID) {
        return (
            <Message
                model={{
                    message: content,
                    sentTime: moment(created).fromNow(),
                    sender: from.name,
                    direction: 'outgoing',
                    position: 'single',
                }}
            />
        )
    }

    return (
        <Message
            model={{
                message: content,
                sentTime: moment(message).fromNow(),
                sender: from.name,
                direction: 'incoming',
                position: 'single',
            }}
        >
            <Avatar onError={onError} src={image} />
        </Message>
    )
}

const Messages = () => {
    const { conversation } = data
    const { messages } = conversation
    const userID = conversation.user.id
    const guideID = conversation.guide.id
    return (
        <MainContainer style={{ border: 0 }}>
            <ChatContainer>
                <MessageList>
                    {messages.map((message) => (
                        <MessageConverter
                            userID={userID}
                            guideID={guideID}
                            message={message}
                        />
                    ))}
                </MessageList>
                <MessageInput
                    attachButton={false}
                    placeholder="Type message here"
                />
            </ChatContainer>
        </MainContainer>
    )
}

export default Messages
