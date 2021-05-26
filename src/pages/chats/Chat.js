import {
    IonText,
    IonContent,
    IonGrid,
    IonButton,
    IonLabel,
    IonList,
    IonItem,
    IonAvatar,
} from '@ionic/react'
import styles from 'styled-components'
import React, { useContext } from 'react'
import { AuthContext } from '../../components/AuthProvider'

const buttonStyle = {
    '--color': '#009EA8',
    '--color-activated': '#009EA8',
    '--border-color': '#009EA8',
    '--border-radius': '5px',
    '--border-width': '2px',
    '--background-activated': 'white',
    width: 100,
}

const Line = styles.hr`
    border-top: 1px solid #C2C2C2;
    margin-right: 0px;
    margin-left: 0px;
`

const conversation1 = {
    id: 'someID',
    user: 'user1',
    guide: 'name',
    message: [
        {
            id: '',
            user: 'User',
            content: 'wadup',
        },
        {
            id: '',
            user: 'User',
            content: 'wadup',
        },
        {
            id: '',
            user: 'User',
            content: 'wadup',
        },
        {
            id: '',
            user: 'Guide',
            content: 'wadup',
        },
        {
            id: '',
            user: 'Guide',
            content: 'wadup',
        },
        {
            id: '',
            user: 'User',
            content: 'wadup',
        },
    ],
    created: '',
}

const data = [
    {
        id: '',
        user: { id: '123' },
        guide: { name: 'name1', },
        message: [
            {
                from: { id: '123' },
                content:
                    ' you this is very  this is very this is very very long message i dont know what to type',
            },
            {
                from: { id: '' },
                content: 'Hello world',
            },
            {
                from: { id: '' },
                content: 'No you',
            },
        ],
    },
    {
        id: '',
        user: { id: '123' },
        guide: { name: 'name1' },
        message: [
            {
                from: { id: '123' },
                content: 'Hello world',
            },
        ],
    },
    {
        id: '',
        user: { id: '123' },
        guide: { name: 'name1' },
        message: [
            {
                from: { id: '123' },
                content: 'Hello world',
            },
        ],
    },
]

const Unauthenticated = ({ showModal }) => (
    <>
        <IonText>
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 32,
                    letterSpacing: '0.04em',
                }}
            >
                Log in to read messages
            </p>
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '200',
                    fontSize: '14px',
                    lineHeight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    letterSpacing: '0.04em',
                    marginBottom: 32,
                }}
            >
                Once you log in, you’ll find messages from guides here.
            </p>
        </IonText>
        <IonButton onClick={showModal} fill="outline" style={buttonStyle}>
            Log in
        </IonButton>
    </>
)

const Authenticated = () => {
    const conversations = data // replace with actual fetching logic
    return (
        <IonList>
            {conversations.map((conversation) => (
                <IonItem>
                    <IonAvatar slot="start">
                        <img src="https://ionicframework.com/docs/demos/api/list/avatar-finn.png" />
                    </IonAvatar>
                    <IonLabel>
                        <h2>{conversation.guide.name}</h2>
                        <p>{conversation.message[0].content}</p>
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}

const Chat = () => {
    const { showModal } = useContext(AuthContext)

    const isAuthenticated = true

    return (
        <IonContent>
            <IonGrid
                style={{
                    margin: '49px 16px 0px 16px',
                }}
            >
                <IonText>
                    <h2
                        style={{
                            fontFamily: 'Comfortaa',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: '36px',
                            lineHeight: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            letterSpacing: '-0.015em',
                        }}
                    >
                        Chats
                    </h2>
                </IonText>
                <Line />
                {isAuthenticated && <Authenticated />}
                {!isAuthenticated && <Unauthenticated showModal={showModal} />}
            </IonGrid>
        </IonContent>
    )
}

export default Chat
