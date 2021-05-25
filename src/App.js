import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from '@apollo/client/react'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'
import firebase from 'firebase/app'
// Add the Firebase products that you want to use
import 'firebase/auth'
import React from 'react'
import 'react-multi-carousel/lib/styles.css'
import { Redirect, Route } from 'react-router-dom'
import './App.css'
import { TabBar } from './components'
import Auth from './components/Auth'
import GuideProivider from './components/shared/GuideContext'
import { Booking, Empty, Explore, Profile, Wishlist, Guide } from './pages'
import Chat from './pages/chats'
/* Theme variables */
import './theme/variables.css'

const firebaseConfig = {
    apiKey: 'AIzaSyC-wQRkTYQokjy2gkuU7dXWWePA__rIEug',
    authDomain: 'apec-2021-nz.firebaseapp.com',
    projectId: 'apec-2021-nz',
    storageBucket: 'apec-2021-nz.appspot.com',
    messagingSenderId: '782342361518',
    appId: '1:782342361518:web:7f112dbc355a83ff24b83f',
    measurementId: 'G-4324QXGC5X',
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL,
})

const authLink = setContext(async (_, { headers }) => {
    let token = null

    if (firebase.auth().currentUser) {
        token = await firebase.auth().currentUser.getIdToken()
    }

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: process.env.REACT_APP_GRAPHQL,
    cache: new InMemoryCache(),
})

const App = () => (
    <IonApp>
        <ApolloProvider client={client}>
            <GuideProivider>
                <IonReactRouter>
                    <Auth>
                        <Guide />
                        <TabBar>
                            <IonRouterOutlet>
                                <Route
                                    exact
                                    path="/explore"
                                    component={Explore}
                                />
                                <Route
                                    exact
                                    path="/wishlist"
                                    component={Wishlist}
                                />
                                <Route
                                    exact
                                    path="/bookings"
                                    component={Booking}
                                />
                                <Route exact path="/chats" component={Chat} />
                                <Route
                                    exact
                                    path="/profile"
                                    component={Profile}
                                />
                                <Route exact path="/">
                                    <Redirect to="/explore" />
                                </Route>
                            </IonRouterOutlet>
                        </TabBar>
                    </Auth>
                </IonReactRouter>
            </GuideProivider>
        </ApolloProvider>
    </IonApp>
)

export default App
