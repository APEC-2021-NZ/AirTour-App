import React, { useContext } from 'react'
import { IonCard, IonCardContent, IonCol } from '@ionic/react'
import { GuideContext } from './GuideContext'

const TourGuideColumnCard = ({ value: guide }) => {
    const { setShowGuide, setGuideID } = useContext(GuideContext)
    return (
        <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeSm="6" sizeXs="6">
            <IonCard
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setShowGuide(true)
                    setGuideID(guide.ID)
                }}
            >
                <img src={guide.image} alt="Tour Guide Portrait" />
                <IonCardContent style={{ fontSize: 12, color: '#000000' }}>
                    {`★ ${guide.rating} (${guide.numReviews}) - ${guide.city}`}
                    <br />
                    <br />
                    {guide.description}
                </IonCardContent>
            </IonCard>
        </IonCol>
    )
}

export default TourGuideColumnCard
