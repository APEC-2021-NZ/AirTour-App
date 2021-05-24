import {
    IonButton,
    IonGrid,
    IonIcon,
    IonInput,
    IonModal,
    IonRow,
    IonText,
    IonLoading,
} from '@ionic/react'
import firebase from 'firebase'
import { closeOutline } from 'ionicons/icons'
import React, { useState } from 'react'

const buttonStyle = {
    '--color': '#009EA8',
    '--color-activated': '#009EA8',
    '--border-color': '#009EA8',
    '--border-radius': '5px',
    '--border-width': '2px',
    '--background-activated': 'white',
    width: '100%',
}

const AuthModal = ({ open, onClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
            setError(e.message)
            return
        } finally {
            setPassword('')
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        setLoading(true)

        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
        } catch (e) {
            setError(e.message)
            return
        } finally {
            setPassword('')
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (!loading) {
            onClose()
        }
    }

    return (
        <IonModal isOpen={open} onDidDismiss={handleClose}>
            <IonGrid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <IonRow>
                    <IonText color="primary">
                        <h2
                            style={{
                                fontFamily: 'Comfortaa',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontSize: '24px',
                                lineHeight: '27px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '-0.015em',
                                padding: '5px',
                            }}
                        >
                            Log in or sign up
                        </h2>
                    </IonText>
                </IonRow>

                <IonRow>
                    <IonText color="primary">
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
                                padding: '5px',
                            }}
                        >
                            Log in or register to start planning your next tour.
                        </p>
                    </IonText>
                </IonRow>

                <IonRow>
                    <IonGrid>
                        <div
                            style={{
                                border: '1px solid #979797',
                                borderRadius: '10px',
                            }}
                        >
                            <IonRow>
                                <IonInput
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onIonChange={(e) =>
                                        setEmail(e.detail.value)
                                    }
                                    style={{
                                        '--padding-top': '16px',
                                        '--padding-bottom': '16px',
                                        '--padding-start': '12px',
                                        '--padding-end': '12px',
                                        borderBottom: '1px solid #979797',
                                    }}
                                />
                            </IonRow>
                            <IonRow>
                                <IonInput
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onIonChange={(e) =>
                                        setPassword(e.detail.value)
                                    }
                                    style={{
                                        '--padding-top': '16px',
                                        '--padding-bottom': '16px',
                                        '--padding-start': '12px',
                                        '--padding-end': '12px',
                                    }}
                                />
                            </IonRow>
                        </div>
                    </IonGrid>
                </IonRow>

                {error && (
                    <IonRow
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <IonText color="danger">
                            <p
                                style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    letterSpacing: '0.04em',
                                    textAlign: 'center',
                                }}
                            >
                                {error}
                            </p>
                        </IonText>
                    </IonRow>
                )}

                <IonRow>
                    <IonButton
                        onClick={handleLogin}
                        fill="outline"
                        style={buttonStyle}
                        disabled={loading}
                    >
                        Log in
                    </IonButton>
                </IonRow>

                <IonRow>
                    <IonButton
                        onClick={handleRegister}
                        fill="outline"
                        style={buttonStyle}
                        disabled={loading}
                    >
                        Register
                    </IonButton>
                </IonRow>

                <IonLoading isOpen={loading} />

                <IonButton
                    fill="clear"
                    onClick={handleClose}
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                    }}
                >
                    <IonIcon icon={closeOutline} />
                </IonButton>
            </IonGrid>
        </IonModal>
    )
}

export default AuthModal
