import React, { useContext } from 'react'
import { IonCard, IonCardContent, IonCol, IonIcon } from '@ionic/react'
import { heartOutline } from 'ionicons/icons'
import styles from 'styled-components'
import { GuideContext } from './GuideContext'

const CustomIcon = styles(IonIcon)`
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 32px;
    padding: 7px;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`

const TourGuideColumnCard = ({ value: guide }) => {
    const { setShowGuide, setGuideID } = useContext(GuideContext)
    return (
        <IonCol
            style={{ padding: 0 }}
            sizeXl="2"
            sizeLg="3"
            sizeMd="4"
            sizeSm="6"
            sizeXs="6"
        >
            <IonCard
                style={{ cursor: 'pointer', borderRadius: 15, margin: 5 }}
                onClick={() => {
                    setShowGuide(true)
                    setGuideID(guide.ID)
                }}
            >
                <img
                    src={guide.image}
                    style={{ objectFit: 'cover' }}
                    alt="Tour Guide Portrait"
                />
                <IonCardContent style={{ fontSize: 12, color: '#000000' }}>
                    {`★ ${guide.rating} (${guide.numReviews}) - ${guide.city}`}
                    <br />
                    <br />
                    {guide.description}
                </IonCardContent>
            </IonCard>
            <CustomIcon
                onClick={() => alert('test')}
                icon={heartOutline}
                style={{
                    top: 15,
                    right: 15,
                }}
            />
        </IonCol>
    )
}

export default TourGuideColumnCard
