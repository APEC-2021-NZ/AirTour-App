import React, { useState } from 'react'

import moment from 'moment'
import { IonItem, IonAvatar, IonLabel, IonRow } from '@ionic/react'
import noImage from '../../images/no-image.jpg'

const BookingItem = ({ booking, userID, guideID }) => {
    const { id, tourist, guide, startTime, endTime, created } = booking

    const [image, setImage] = useState(
        userID === tourist.id ? guide.image.uri : tourist.image.uri,
    )

    const name = userID === tourist.id ? guide.name : tourist.name

    const onError = () => {
        setImage(noImage)
    }

    return (
        <IonItem>
            <IonAvatar slot="start">
                <img onError={onError} alt={name} src={image} />
            </IonAvatar>
            <IonLabel>
                <h2>{name}</h2>
                <IonRow>
                    <p>{`${moment(startTime).toDate()} - ${moment(
                        endTime,
                    ).toDate()}`}</p>
                    <div style={{ margin: 'auto' }} />
                    <p>{moment(created).fromNow()}</p>
                </IonRow>
            </IonLabel>
        </IonItem>
    )
}

export default BookingItem
