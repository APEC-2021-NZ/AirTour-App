import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider, useQuery } from '@apollo/client/react'

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
import { Booking, Empty, Explore, Wishlist } from './pages'
import { TabBar } from './components'
import { MeQuery } from './graphql/queries/guides'

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL,
    cache: new InMemoryCache(),
})

const App = () => (
    // const {loading, error, data} = useQuery(MeQuery)

    // if (loading ) return <Spinner/>

    // if (error) //redirect

    // return <>{data}</>

    <IonApp>
        <ApolloProvider client={client}>
            <IonReactRouter>
                <TabBar>
                    <IonRouterOutlet>
                        <Route exact path="/explore" component={Explore} />
                        <Route exact path="/wishlist" component={Wishlist} />
                        <Route exact path="/bookings" component={Booking} />
                        <Route exact path="/chats" component={Empty} />
                        <Route exact path="/profile" component={Empty} />
                        <Route exact path="/">
                            <Redirect to="/explore" />
                        </Route>
                    </IonRouterOutlet>
                </TabBar>
            </IonReactRouter>
        </ApolloProvider>
    </IonApp>
)

export default App
