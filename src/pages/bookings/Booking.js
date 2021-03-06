import {
    IonText,
    IonContent,
    IonGrid,
    IonButton,
    IonLoading,
} from '@ionic/react'
import styles from 'styled-components'
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'

import { AuthContext } from '../../components/AuthProvider'
import { BookingsQuery } from '../../graphql/queries/booking'
import BookingItem from './BookingItem'

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
                Log in to view your bookings
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
                Once you log in, you’ll be able to find any bookings you’ve made
                here
            </p>
        </IonText>
        <IonButton onClick={showModal} fill="outline" style={buttonStyle}>
            Log in
        </IonButton>
    </>
)

const Authenticated = () => {
    const { data, loading, error } = useQuery(BookingsQuery)

    const bookings = [
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
            startTime: new Date(),
            endTime: new Date(),
            description: 'Fk my life',
            price: '$10 per day',
            created: new Date(),
        },
    ]
    return (
        <>
            <IonLoading isOpen={loading} />

            {data?.bookings.length === 0 ? <p>Bookings is empty</p> : null}
            {data?.bookings.map((booking) => (
                <BookingItem booking={booking} />
            ))}
        </>
    )
}

const Booking = () => {
    const { showModal, isAuthenticated } = useContext(AuthContext)
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
                        Bookings
                    </h2>
                </IonText>
                <Line />
                {isAuthenticated && <Authenticated />}
                {!isAuthenticated && <Unauthenticated showModal={showModal} />}
            </IonGrid>
        </IonContent>
    )
}

export default Booking
