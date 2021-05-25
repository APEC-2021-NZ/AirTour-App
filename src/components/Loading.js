import React from 'react'
import { IonSpinner, IonIcon } from '@ionic/react'
import { alertCircleOutline } from 'ionicons/icons'

const Loading = ({ loading, error, component }) => {
    if (loading) {
        return <IonSpinner style={{ margin: 'auto' }} name="crescent" />
    }

    if (component == null) {
        return (
            <IonIcon
                style={{ margin: 'auto', width: '100%', height: 32 }}
                icon={alertCircleOutline}
            />
        )
    }

    return component
}

export default Loading
