import { IonGrid, IonIcon, IonModal, IonRow, IonCol } from '@ionic/react'
import {
    arrowBack,
    chevronBackOutline,
    heartOutline,
    shareOutline,
} from 'ionicons/icons'
import React, { useContext } from 'react'
import styles from 'styled-components'
import { GuideContext } from '../../components/shared/GuideContext'

const CustomModel = styles(IonModal)`
    border-radius: 25px 25px 0px 0px;
`

const CustomIcon = styles(IonIcon)`
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 32px;
    padding: 7px;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

`

const Guide = ({ id, wishlist, share }) => {
    const { showGuide, setShowGuide } = useContext(GuideContext)
    const tourGuide = {
        id: 'b0eda78c-e890-42c6-acff-ea8aa323f1a5',
        image: 'https://picsum.photos/id/1025/300/300',
        city: 'Auckland City, New Zealand',
        description: 'Love hiking and tramping in nature',
        rating: 4.97,
        numReviews: 21,
    }
    return (
        <CustomModel
            isOpen={showGuide}
            keyboardClose={false}
            onDidDismiss={() => setShowGuide(false)}
            fullscreen
        >
            <img
                style={{
                    padding: 0,
                    height: 236,
                    objectFit: 'cover',
                }}
                alt={tourGuide.description}
                src={tourGuide.image}
            />
            <IonGrid style={{ maxWidth: 700, padding: '0px 20px 0px 20px' }}>
                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: '24px',
                        marginTop: 32,
                        marginBottom: 0,
                    }}
                >
                    {tourGuide.description}
                </p>
                <p
                    style={{ marginTop: 8, fontSize: 13 }}
                >{`★ ${tourGuide.rating} (${tourGuide.numReviews}) - ${tourGuide.city}`}</p>
                <hr
                    style={{
                        borderTop: '1px solid #C2C2C2',
                        marginRight: 5,
                        marginLeft: 5,
                    }}
                />
            </IonGrid>
            <CustomIcon
                onClick={() => setShowGuide(false)}
                icon={arrowBack}
                style={{
                    top: 30,
                    left: 20,
                }}
            />
            <CustomIcon
                onClick={shareOutline}
                icon={shareOutline}
                style={{
                    top: 30,
                    right: 80,
                }}
            />
            <CustomIcon
                onClick={wishlist}
                icon={heartOutline}
                style={{
                    top: 30,
                    right: 20,
                }}
            />
        </CustomModel>
    )
}

export default Guide
