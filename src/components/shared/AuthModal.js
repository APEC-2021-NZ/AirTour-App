import {
    IonButton,
    IonDatetime,
    IonGrid,
    IonIcon,
    IonInput,
    IonLoading,
    IonModal,
    IonRow,
    IonText,
} from '@ionic/react'
import firebase from 'firebase'
import { closeOutline } from 'ionicons/icons'
import moment from 'moment'
import React, { useState } from 'react'
import isEmail from 'validator/lib/isEmail'

const buttonStyle = {
    '--color': '#009EA8',
    '--color-activated': '#009EA8',
    '--border-color': '#009EA8',
    '--border-radius': '5px',
    '--border-width': '2px',
    '--background-activated': 'white',
    width: '100%',
}

const RegisterModal = ({ email, password, onClose, onRegister, open }) => {
    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')
    const [dob, setDob] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleRegister = async () => {
        if (!firstname) {
            setError('Please enter your firstname')
            return
        }

        if (!surname) {
            setError('Please enter your surname')
            return
        }

        if (!dob) {
            setError('Please enter your date of birth')
            return
        }

        const eighteenYearsAgo = moment().subtract(18, 'years').toDate()

        if (new Date(dob) > eighteenYearsAgo) {
            setError('You must be at least 18 years old to register')
            return
        }

        setLoading(true)

        try {
            await onRegister(firstname, surname, dob)
            setError(null)
        } catch (e) {
            setError(e.message)
            return
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (!loading) {
            onClose()
        }
    }

    return (
        <IonModal onDidDismiss={handleClose} isOpen={open}>
            <IonGrid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '360px',
                    marginTop: '75px',
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
                            Add your info
                        </h2>
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
                                    placeholder="Firstname"
                                    type="text"
                                    value={firstname}
                                    onIonChange={(e) =>
                                        setFirstname(e.detail.value)
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
                                    placeholder="Surname"
                                    type="text"
                                    value={surname}
                                    onIonChange={(e) =>
                                        setSurname(e.detail.value)
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

                <IonRow>
                    <IonText>
                        <p
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '200',
                                fontSize: '11px',
                                lineHeight: '13px',
                            }}
                        >
                            Make sure it matches the name on your government ID
                        </p>
                    </IonText>
                </IonRow>

                <IonRow>
                    <IonDatetime
                        displayFormat="D MMM YYYY"
                        placeholder="Date of birth"
                        value={dob}
                        onIonChange={(e) => setDob(e.detail.value)}
                        style={{
                            '--padding-top': '16px',
                            '--padding-bottom': '16px',
                            '--padding-start': '12px',
                            '--padding-end': '12px',
                            border: '1px solid #979797',
                            borderRadius: '10px',
                            margin: '5px',
                            width: '100%',
                        }}
                    />
                </IonRow>

                <IonRow>
                    <IonText>
                        <p
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '200',
                                fontSize: '11px',
                                lineHeight: '13px',
                            }}
                        >
                            To sign up, you need to be at least 18. Other people
                            will not be able to see your date of birth.
                        </p>
                    </IonText>
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
                    <IonText>
                        <p
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '11px',
                                lineHeight: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '0.04em',
                            }}
                        >
                            <span>
                                By selecting Agree and continue below, you agree
                                to our <u>Terms of Service</u>,{' '}
                                <u>Payments Terms of Service</u>, and{' '}
                                <u>Privacy Policy</u>.
                            </span>
                        </p>
                    </IonText>
                </IonRow>

                <IonRow>
                    <IonButton
                        onClick={handleRegister}
                        fill="outline"
                        style={buttonStyle}
                        disabled={loading}
                    >
                        Agree and continue
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

const AuthModal = ({ open, onClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [register, setRegister] = useState(false)

    const handleLogin = async () => {
        setLoading(true)

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            setError(null)
        } catch (e) {
            setError(e.message)
            return
        } finally {
            setPassword('')
            setLoading(false)
        }
    }

    const handleRegister = async (firstname, surname, dob) => {
        setLoading(true)

        try {
            // call createUser mutation and check if an error is returned
            setError('')
        } catch (e) {
            // setRegister(false)
            setError(e.message)
            return
        } finally {
            setLoading(false)
        }
    }

    const handleRegisterOpen = async () => {
        if (!isEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        if (password.length < 6) {
            setError('Passwords must be at least 6 characters long')
            return
        }

        setError('')
        setRegister(true)
    }

    const handleRegisterClose = () => {
        setRegister(false)
    }

    const handleClose = () => {
        if (!loading) {
            setRegister(false)
            setPassword('')
            setError(null)
            onClose()
        }
    }

    return (
        <IonModal isOpen={open} onDidDismiss={handleClose}>
            <RegisterModal
                email={email}
                password={password}
                onClose={handleRegisterClose}
                onRegister={handleRegister}
                open={register}
            />
            <IonGrid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '360px',
                    marginTop: '75px',
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
                        onClick={handleRegisterOpen}
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
