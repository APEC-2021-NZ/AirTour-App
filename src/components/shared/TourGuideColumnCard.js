import { useMutation } from '@apollo/client'
import { IonCard, IonCardContent, IonCol, IonIcon } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import React, { useContext, useState } from 'react'
import styles from 'styled-components'
import {
    AddToWishlistMutation,
    RemoveFromWishlistMutation,
} from '../../graphql/mutations/wishlist'
import noImage from '../../images/no-image.jpg'
import { AuthContext } from '../AuthProvider'
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
    const [addToWishlist, {}] = useMutation(AddToWishlistMutation)
    const [removeFromWishlist, {}] = useMutation(RemoveFromWishlistMutation)
    const { user, refresh } = useContext(AuthContext)
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
                style={{
                    cursor: 'pointer',
                    borderRadius: 15,
                    margin: 5,
                    height: '300px',
                    overflow: 'scrollbar',
                    objectFit: 'cover',
                }}
                onClick={() => {
                    setGuideID(guide.id)
                    setShowGuide(true)
                }}
            >
                <img
                    onError={onError}
                    src={image}
                    style={{ objectFit: 'cover', width: '100%' }}
                    alt="Tour Guide Portrait"
                    height="162.5px"
                />
                <IonCardContent
                    style={{
                        fontSize: 12,
                        color: '#000000',
                    }}
                >
                    {`★ ${guide.rating.toFixed(2)} (${guide.numReviews}) - ${
                        guide.city?.name
                    }, ${guide.city?.country?.name}`}
                    <br />
                    <br />
                    {guide.blurb}
                </IonCardContent>
            </IonCard>
            <CustomIcon
                onClick={async () => {
                    if (user?.wishlist) {
                        if (user.wishlist.includes(guide.id)) {
                            await removeFromWishlist({
                                variables: {
                                    guideID: guide.id,
                                },
                            })
                        } else {
                            await addToWishlist({
                                variables: {
                                    guideID: guide.id,
                                },
                            })
                        }
                        refresh()
                    }
                }}
                icon={guide.liked ? heart : heartOutline}
                style={{
                    top: 15,
                    right: 15,
                    color: user?.wishlist?.includes(guide.id) ? 'red' : '',
                }}
            />
        </IonCol>
    )
}

export default TourGuideColumnCard
