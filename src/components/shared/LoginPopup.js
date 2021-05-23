import React, { useState } from 'react'
import {
    IonContent,
    IonModal,
    IonButton,
    IonGrid,
    IonRow,
    IonInput,
    IonPage,
    IonText,
    IonToast,
} from '@ionic/react'
import firebase from 'firebase'

const LoginPopup = ({ showModal, setShowModal }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showSnack, setShowSnack] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastColor, setToastColor] = useState('primary')

    const toastSuccess = (message) => {
        setToastMessage(message)
        setToastColor('success')
        setShowSnack(true)
    }

    const toastError = (message) => {
        setToastMessage(message)
        setToastColor('danger')
        setShowSnack(true)
    }

    const handleLogin = async () => {
        try {
            const user = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
            toastSuccess('Login successful!')
            window.location.reload()
        } catch (err) {
            toastError(err?.message || '')
        }
    }

    return (
        <>
            <IonModal isOpen={showModal} backdropDismiss={false}>
                <IonPage>
                    <IonContent fullscreen>
                        <IonGrid>
                            <IonRow style={{ justifyContent: 'flex-end' }}>
                                <IonButton onClick={() => setShowModal(false)}>
                                    X
                                </IonButton>
                            </IonRow>
                            <IonRow>
                                <IonText>
                                    <h2>Log in or sign up to APP</h2>
                                </IonText>
                            </IonRow>
                            <IonRow>
                                <p>Log in to start planning your next tour.</p>
                            </IonRow>
                        </IonGrid>

                        <div
                            style={{
                                border: '1px solid #979797',
                                borderRadius: 10,
                                marginLeft: 10,
                                marginRight: 10,
                            }}
                        >
                            <IonInput
                                placeholder="Email"
                                style={{
                                    borderBottom: '1px solid #979797',
                                }}
                                type="text"
                                value={email}
                                onIonInput={(e) => setEmail(e.target.value)}
                            />
                            <IonInput
                                placeholder="Password"
                                type="password"
                                value={password}
                                onIonInput={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                marginTop: 20,
                                marginLeft: 10,
                                marginRight: 10,
                            }}
                        >
                            <IonButton
                                style={{ flex: 1 }}
                                onClick={handleLogin}
                            >
                                Login
                            </IonButton>
                            <IonButton style={{ flex: 1 }}>Register</IonButton>
                        </div>
                    </IonContent>
                </IonPage>
            </IonModal>
            <IonToast
                isOpen={showSnack}
                onDidDismiss={() => setShowSnack(false)}
                message={toastMessage}
                position="bottom"
                color={toastColor}
                duration={2000}
                buttons={[
                    {
                        text: 'Close',
                        role: 'cancel',
                    },
                ]}
            />
        </>
    )
}

export default LoginPopup
