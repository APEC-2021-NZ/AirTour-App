import { useQuery } from '@apollo/client'
import {
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonRow,
} from '@ionic/react'
import moment from 'moment'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { ConverstationsQuery } from '../../graphql/queries/conversation'
import noImage from '../../images/no-image.jpg'

const Conversations = () => {
    const { data, loading } = useQuery(ConverstationsQuery)

    if (loading || !data) {
        return <IonLoading isOpen />
    }

    const { me } = data
    const { id: userID, conversations } = me

    return (
        <IonList>
            {conversations.length === 0 ? <p>Conversations is empty</p> : null}
            {conversations.map((conversation) => (
                <Conversation
                    userID={userID}
                    guideID={conversation.guide.id}
                    conversation={conversation}
                />
            ))}
        </IonList>
    )
}

const Conversation = ({ conversation, userID, guideID }) => {
    const history = useHistory()
    const { id, user, guide, messages, created } = conversation
    const lastMessage = messages[0]
    console.log(userID, user.id)
    const name =
        userID === user.id
            ? `${guide.user.firstname} ${guide.user.surname}`
            : `${user.firstname} ${user.surname}`

    const [image, setImage] = useState(
        userID === user.id ? guide.user.image.uri : user.image.uri,
    )
    const onError = () => {
        setImage(noImage)
    }

    return (
        <IonItem onClick={() => history.push(`/chats/${id}`)}>
            <IonAvatar slot="start">
                <img onError={onError} alt={name} src={image} />
            </IonAvatar>
            <IonLabel>
                <h2>{name}</h2>
                <IonRow>
                    <p>{`${lastMessage.from.firstname} - ${lastMessage.content}`}</p>
                    <div style={{ margin: 'auto' }} />
                    <p>{moment(created).fromNow()}</p>
                </IonRow>
            </IonLabel>
        </IonItem>
    )
}

export default Conversations
