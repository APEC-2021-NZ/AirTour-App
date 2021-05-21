import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import { Wishlist, Empty, Explore } from './pages'
import TabBar from './components/shared/TabBar'

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <TabBar>
                <IonRouterOutlet>
                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/wishlist" component={Wishlist} />
                    <Route exact path="/bookings" component={Empty} />
                    <Route exact path="/chats" component={Empty} />
                    <Route exact path="/profile" component={Empty} />
                    <Route exact path="/">
                        <Redirect to="/explore" />
                    </Route>
                </IonRouterOutlet>
            </TabBar>
        </IonReactRouter>
    </IonApp>
)

export default App
