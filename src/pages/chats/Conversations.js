import { IonAvatar, IonItem, IonLabel, IonList, IonRow } from '@ionic/react'
import React, { useState } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router'
import noImage from '../../images/no-image.jpg'

const me = {
    id: '1',
    guide: { id: '1' },
    conversations: [
        {
            id: '1',
            user: {
                id: '1',
                name: 'Me',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            guide: {
                id: '2',
                name: 'Guide2',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            created: new Date(),
            messages: [
                {
                    id: '1',
                    from: { id: '1', name: 'Me' },
                    content: 'Messages To Me LoL',
                    created: new Date(),
                },
            ],
        },
        {
            id: '2',
            user: {
                id: '1',
                name: 'Me',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            guide: {
                id: '3',
                name: 'Guide3',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            created: new Date(),
            messages: [
                {
                    id: '1',
                    from: { id: '1', name: 'Me' },
                    content: 'Messages To Me LoL',
                    created: new Date(),
                },
            ],
        },
        {
            id: '3',
            user: {
                id: '1',
                name: 'Me',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            guide: {
                id: '4',
                name: 'Guide4',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            created: new Date(),
            messages: [
                {
                    id: '1',
                    from: { id: '1', name: 'Me' },
                    content: 'Messages To Me LoL',
                    created: new Date(),
                },
            ],
        },
        {
            id: '4',
            user: {
                id: '1',
                name: 'Me',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            guide: {
                id: '5',
                name: 'Guide5',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            created: new Date(),
            messages: [
                {
                    id: '1',
                    from: { id: '1', name: 'Me' },
                    content: 'Messages To Me LoL',
                    created: new Date(),
                },
            ],
        },
        {
            id: '5',
            user: {
                id: '2',
                name: 'Tour2',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            guide: {
                id: '1',
                name: 'Me',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            created: new Date(),
            messages: [
                {
                    id: '1',
                    from: { id: '1', name: 'Me' },
                    content: 'Messages To Me LoL',
                    created: new Date(),
                },
            ],
        },
        {
            id: '6',
            user: {
                id: '3',
                name: 'Tour3',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            guide: {
                id: '1',
                name: 'Me',
                image: {
                    uri: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
                },
            },
            created: new Date(),
            messages: [
                {
                    id: '1',
                    from: { id: '1', name: 'Me' },
                    content: 'Messages To Me LoL',
                    created: new Date(),
                },
            ],
        },
    ],
}

const Conversations = () => {
    const { id: userID, guide, conversations } = me
    return (
        <IonList>
            {conversations.map((conversation) => (
                <Conversation
                    userID={userID}
                    guideID={guide.id}
                    conversation={conversation}
                />
            ))}
        </IonList>
    )
}

const Conversation = ({ conversation, userID, guideID }) => {
    const history = useHistory()
    const { id, user, guide, messages, created } = conversation

    const name = userID === user.id ? guide.name : user.name
    const lastMessage = messages[0]

    const [image, setImage] = useState(
        userID === user.id ? guide.image.uri : user.image.uri,
    )
    const onError = () => {
        setImage(noImage)
    }

    return (
        <IonItem onClick={() => history.push(`/chats/${id}`)}>
            <IonAvatar slot="start">
                <img onError={onError} alt={name} src={image} />
            </IonAvatar>
            <IonLabel>
                <h2>{name}</h2>
                <IonRow>
                    <p>{`${lastMessage.from.name} - ${lastMessage.content}`}</p>
                    <div style={{ margin: 'auto' }} />
                    <p>{moment(created).fromNow()}</p>
                </IonRow>
            </IonLabel>
        </IonItem>
    )
}

export default Conversations
