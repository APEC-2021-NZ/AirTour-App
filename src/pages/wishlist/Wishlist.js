import React, { useContext } from 'react'
import {
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonButton,
    IonLoading,
} from '@ionic/react'
import { useQuery } from '@apollo/client/react'
import styles from 'styled-components'
import { TourGuideColumnCard } from '../../components'
import { GuidesQuery } from '../../graphql/queries/guide'
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
                    marginTop: 20,
                    marginBottom: 32,
                }}
            >
                Collect places to go and things to do by tapping the heart icon.
            </p>
        </IonText>
        <IonButton onClick={showModal} fill="outline" style={buttonStyle}>
            Log in
        </IonButton>
    </>
)

const Wishlist = () => {
    const { showModal, isAuthenticated, logout, user } = useContext(AuthContext)
    const { loading, data } = useQuery(GuidesQuery, {
        variables: {
            input: {
                onWishlist: true,
            },
        },
    })

    if (loading) {
        return <IonLoading open={loading} />
    }

    const tourGuides = (data?.guides || []).map((c) => ({
        id: c.id,
        image: c.image.uri,
        city: `${c.city.name}, ${c.city.country.name}`,
        description: c.description,
        rating: c.rating.toFixed(2),
        numReviews: c.numReviews,
        liked: true,
    }))

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
                        Wishlists
                    </h2>
                </IonText>
                <Line />
                {isAuthenticated && tourGuides.length !== 0 ? (
                    <IonRow>
                        {tourGuides.map((value) => (
                            <TourGuideColumnCard key={value.id} value={value} />
                        ))}
                    </IonRow>
                ) : (
                    <p>Wishlist is empty</p>
                )}
                {!isAuthenticated && <Unauthenticated showModal={showModal} />}
            </IonGrid>
        </IonContent>
    )
}

export default Wishlist
