import React, { useEffect, useState } from 'react'
import { IonSpinner, IonIcon } from '@ionic/react'
import { alertCircleOutline } from 'ionicons/icons'

const Loading = ({ loading, error, component }) => {
    const [carouselChildren, setCarouselChildren] = useState(<></>)

    useEffect(() => {
        setTimeout(() => {
            setCarouselChildren(component)
        }, 0)
    }, [component])

    if (loading) {
        return (
            <IonSpinner
                style={{
                    position: 'relative',
                    top: 30,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                name="crescent"
            />
        )
    }

    if (component == null) {
        return (
            <IonIcon
                style={{ margin: 'auto', width: '100%', height: 32 }}
                icon={alertCircleOutline}
            />
        )
    }

    return carouselChildren
}

export default Loading
