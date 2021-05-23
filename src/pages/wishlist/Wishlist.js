import React, { useState } from 'react'
import {
    IonContent,
    IonGrid,
    IonRow,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
} from '@ionic/react'
import { useQuery } from '@apollo/client/react'
import { TourGuideColumnCard, LoginPopup } from '../../components'
import { MeQuery } from '../../graphql/queries/guides'

const Wishlist = () => {
    const tourGuides = new Array(20).fill({
        id: 'b0eda78c-e890-42c6-acff-ea8aa323f1a5',
        image: 'https://picsum.photos/id/1025/300/300',
        city: 'Auckland',
        description: 'Love hiking and tramping in nature',
        rating: 4.97,
        numReviews: 21,
    })

    const [showModal, setShowModal] = useState(false)

    const { loading, error, data } = useQuery(MeQuery)

    console.log('result', { loading, error, data })

    return (
        <>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Wishlist</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid style={{ padding: '20' }}>
                    <IonRow>
                        <IonButton onClick={() => setShowModal(true)}>
                            Login
                        </IonButton>
                    </IonRow>
                    <IonRow>
                        {tourGuides.map((value) => (
                            <TourGuideColumnCard value={value} />
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
            <LoginPopup showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}

export default Wishlist
