import React from 'react'
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'

const Empty = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Tab 1</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Tab 4</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonContent>
    </IonPage>
)

export default Empty
