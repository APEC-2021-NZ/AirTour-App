import {
    IonButton,
    IonContent,
    IonGrid,
    IonItem,
    IonList,
    IonText,
    IonIcon,
    IonLabel,
} from '@ionic/react'
import React, { useContext } from 'react'
import {
    documentTextOutline,
    helpOutline,
    personOutline,
    settingsOutline,
} from 'ionicons/icons'
import { AuthContext } from '../../components/Auth'

const buttonStyle = {
    '--color': '#009EA8',
    '--color-activated': '#009EA8',
    '--border-color': '#009EA8',
    '--border-radius': '5px',
    '--border-width': '2px',
    '--background-activated': 'white',
    width: '100%',
}

const textStyle = {
    left: -1,
    top: 16,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.04em',

    color: '#000000',
}

const Unauthenticated = ({ showModal }) => (
    <>
        <IonText>
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
                }}
            >
                Log in to start planning your next tour.
            </p>
        </IonText>
        <IonButton onClick={showModal} fill="outline" style={buttonStyle}>
            Log in
        </IonButton>
        <IonText>
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
                }}
            >
                Don’t have an account?
                <button
                    type="button"
                    style={{
                        background: 'none',
                        marginLeft: '3px',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '14px',
                        lineHeight: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '0.04em',
                        textDecorationLine: 'underline',
                    }}
                    onClick={showModal}
                >
                    Sign up
                </button>
            </p>
        </IonText>
    </>
)

const Authenticated = ({ logout }) => (
    <>
        <IonButton onClick={logout} fill="outline" style={buttonStyle}>
            Log out
        </IonButton>
        <IonList>
            <IonItem />
            <IonItem button>
                <IonIcon slot="end" icon={settingsOutline} />
                <IonLabel style={textStyle}>Settings</IonLabel>
            </IonItem>
            <IonItem button>
                <IonIcon slot="end" icon={personOutline} />
                <IonLabel style={textStyle}>Learn about touring</IonLabel>
            </IonItem>
            <IonItem button>
                <IonIcon slot="end" icon={helpOutline} />
                <IonLabel style={textStyle}>Get Help</IonLabel>
            </IonItem>
            <IonItem button>
                <IonIcon slot="end" icon={documentTextOutline} />
                <IonLabel style={textStyle}>Terms of Serice</IonLabel>
            </IonItem>
        </IonList>
    </>
)

const Profile = () => {
    const { showModal, isAuthenticated, logout } = useContext(AuthContext)

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
                            color: '#000000',
                        }}
                    >
                        Your profile
                    </h2>
                </IonText>
                {isAuthenticated && <Authenticated logout={logout} />}
                {!isAuthenticated && <Unauthenticated showModal={showModal} />}
            </IonGrid>
        </IonContent>
    )
}

export default Profile
