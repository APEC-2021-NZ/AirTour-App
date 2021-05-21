import React from 'react'
import { IonCard, IonCardContent, IonCol } from '@ionic/react'

const TourGuideColumnCard = ({ value }) => (
    <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeSm="6" sizeXs="6">
        <IonCard
            style={{ cursor: 'pointer' }}
            onClick={() => {
                // Navigate to the guide's profile
                alert(`Navigate to guide's profile - TODO`)
            }}
        >
            <img src={value.image} alt="Tour Guide Portrait" />
            <IonCardContent style={{ fontSize: 12, color: '#000000' }}>
                {`★ ${value.rating} (${value.numReviews}) - ${value.city}`}
                <br />
                <br />
                {value.description}
            </IonCardContent>
        </IonCard>
    </IonCol>
)

export default TourGuideColumnCard
