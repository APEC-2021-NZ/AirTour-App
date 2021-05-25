import React from 'react'
import {
    IonContent,
    IonGrid,
    IonRow,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLoading,
} from '@ionic/react'
import { useQuery } from '@apollo/client/react'
import { TourGuideColumnCard } from '../../components'
import { GuidesQuery } from '../../graphql/queries/guide'

const Wishlist = () => {
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Wishlist</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonGrid style={{ padding: 10 }}>
                <IonRow>
                    {tourGuides.map((value) => (
                        <TourGuideColumnCard key={value.id} value={value} />
                    ))}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default Wishlist
