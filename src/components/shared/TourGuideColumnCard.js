import React, { useContext, useState } from 'react'
import { IonCard, IonCardContent, IonCol, IonIcon } from '@ionic/react'
import { heartOutline, heart } from 'ionicons/icons'
import styles from 'styled-components'
import { GuideContext } from './GuideContext'
import noImage from '../../images/no-image.jpg'

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
    const [image, setImage] = useState(guide.image.uri)

    const onError = () => {
        setImage(noImage)
    }
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
                    setGuideID(guide.id)
                    setShowGuide(true)
                }}
            >
                <img
                    onError={onError}
                    src={image}
                    style={{ objectFit: 'cover' }}
                    alt="Tour Guide Portrait"
                />
                <IonCardContent style={{ fontSize: 12, color: '#000000' }}>
                    {`★ ${guide.rating.toFixed(2)} (${guide.numReviews}) - ${
                        guide.city?.name
                    }, ${guide.city?.country?.name}`}
                    <br />
                    <br />
                    {guide.description}
                </IonCardContent>
            </IonCard>
            <CustomIcon
                onClick={() => alert('test')}
                icon={guide.liked ? heart : heartOutline}
                style={{
                    top: 15,
                    right: 15,
                    color: guide.liked ? 'red' : '',
                }}
            />
        </IonCol>
    )
}

export default TourGuideColumnCard
