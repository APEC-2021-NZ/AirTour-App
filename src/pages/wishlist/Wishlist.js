import React from 'react'
import {
    IonContent,
    IonGrid,
    IonRow,
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { TourGuideColumnCard } from '../../components'

const Wishlist = () => {
    const tourGuides = new Array(20).fill({
        id: 'b0eda78c-e890-42c6-acff-ea8aa323f1a5',
        image: 'https://picsum.photos/id/1025/300/300',
        city: 'Auckland',
        description: 'Love hiking and tramping in nature',
        rating: 4.97,
        numReviews: 21,
    })

    return (
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Wishlist</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonGrid style={{ padding: '20' }}>
                <IonRow>
                    {tourGuides.map((value) => (
                        <TourGuideColumnCard value={value} />
                    ))}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default Wishlist
