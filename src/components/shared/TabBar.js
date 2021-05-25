import React, { useContext } from 'react'
import {
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonGrid,
} from '@ionic/react'
import {
    searchOutline,
    heartOutline,
    peopleOutline,
    chatboxOutline,
    personOutline,
} from 'ionicons/icons'
import { AuthContext } from '../AuthProvider'

const TabBar = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <IonTabs>
            {children}
            <IonTabBar slot="bottom">
                <IonTabButton tab="explore" href="/explore">
                    <IonIcon icon={searchOutline} />
                    <IonLabel>Explore</IonLabel>
                </IonTabButton>
                <IonTabButton tab="wishlist" href="/wishlist">
                    <IonIcon icon={heartOutline} />
                    <IonLabel>Wishlists</IonLabel>
                </IonTabButton>
                <IonTabButton tab="bookings" href="/bookings">
                    <IonIcon icon={peopleOutline} />
                    <IonLabel>Bookings</IonLabel>
                </IonTabButton>
                <IonTabButton tab="chats" href="/chats">
                    <IonIcon icon={chatboxOutline} />
                    <IonLabel>Chats</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={personOutline} />
                    <IonLabel>{isAuthenticated ? 'Profile' : 'Login'}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default TabBar
