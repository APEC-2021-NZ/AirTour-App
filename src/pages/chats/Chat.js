import {
    IonText,
    IonContent,
    IonGrid,
    IonButton,
    IonLabel,
    IonList,
    IonItem,
    IonAvatar,
    IonApp,
    IonRouterOutlet,
} from '@ionic/react'
import styles from 'styled-components'
import React, { useContext } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { AuthContext } from '../../components/AuthProvider'
import Conversations from './Conversations'
import Messages from './Messages'

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
    const { path } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${path}/:conversationID`} component={Messages} />
            <Route path={path} component={Conversations} />
        </Switch>
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
                    flexGrow: 1,
                    height: 'calc(100% - 130px)',
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
