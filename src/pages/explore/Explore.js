import React, { useContext, useEffect, useState } from 'react'
import {
    IonText,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonIcon,
    IonInput,
    IonButton,
} from '@ionic/react'
import { searchOutline } from 'ionicons/icons'
import { useQuery } from '@apollo/client'
import Loading from '../../components/Loading'
import {
    ImageCardSmallCarousel,
    ImageCardMediumCarousel,
    ImageCardSmall,
    ImageCardMedium,
} from '../../components/ImageCard'
import Search from './Search'
import Footer from '../../components/Footer'
import TourGuide from '../../images/tour-guide.jpg'
import { ExploreQuery } from '../../graphql/queries/explore'

const Booking = () => {
    const { setShowCreateGuide } = useContext(GuideContext)
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    const { loading, data } = useQuery(ExploreQuery)

    useEffect(() => {
        if (search !== '') {
            setShowSearch(true)
        }
    }, [search])

    return (
        <IonContent>
            <Search
                show={showSearch}
                search={search}
                setSearch={setSearch}
                close={() => setShowSearch(false)}
            />
            <IonGrid
                style={{
                    maxWidth: '100%',
                    height: '52px',
                    backgroundColor: '#3F3F3F',
                }}
            >
                <IonText
                    style={{
                        color: '#C0C0C0',
                        textAlign: 'center',
                        fontSize: 14,
                    }}
                >
                    <p>
                        <u>Get the latest on our COVID-19 Response</u>
                    </p>
                </IonText>
            </IonGrid>
            <IonGrid
                style={{
                    maxWidth: '100%',
                    height: '400px',
                    padding: 27,
                    backgroundImage: 'url(https://picsum.photos/400)',
                    backgroundSize: 'cover',
                }}
            >
                <IonRow
                    style={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: 28,
                        height: 47,
                        rows: 1,
                        textAlign: 'center',
                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <IonIcon
                        icon={searchOutline}
                        style={{
                            position: 'relative',
                            width: 30,
                            top: 15,
                            left: 10,
                        }}
                    />
                    <IonInput
                        value={search}
                        placeholder="Where are you going?"
                        style={{
                            fontSize: 14,
                            width: 100,
                            marginRight: 30,
                        }}
                        onIonChange={(e) => setSearch(e.target.value)}
                    />
                </IonRow>
            </IonGrid>

            <IonGrid style={{ padding: '20px 20px 20px 20px' }}>
                <IonText color="primary">
                    <h2 style={{ fontWeight: 'bold', fontSize: 24 }}>
                        Explore nearby
                    </h2>
                </IonText>
                <Loading
                    loading={loading}
                    component={
                        data ? (
                            <ImageCardSmallCarousel>
                                {data?.tags.map((card) => (
                                    <ImageCardSmall
                                        uri={card.image.uri}
                                        key={card.name}
                                        name={card.name}
                                        description={card.description}
                                    />
                                ))}
                            </ImageCardSmallCarousel>
                        ) : null
                    }
                />

                <IonText color="primary">
                    <h2
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginTop: 47,
                        }}
                    >
                        Go anywhere
                    </h2>
                </IonText>
                <Loading
                    loading={loading}
                    component={
                        data ? (
                            <ImageCardMediumCarousel>
                                {data?.destinations.map((card) => (
                                    <ImageCardMedium
                                        uri={card.image.uri}
                                        key={card.name}
                                        name={card.name}
                                    />
                                ))}
                            </ImageCardMediumCarousel>
                        ) : null
                    }
                />
                <IonGrid
                    style={{
                        backgroundColor: '#171717',
                        borderRadius: 15,
                        overflow: 'hidden',
                        padding: '0',
                        marginTop: 47,
                    }}
                >
                    <IonCol>
                        <IonText
                            style={{
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            <h2 style={{ fontWeight: 'bold' }}>
                                Become a Guide
                            </h2>
                            <p
                                style={{
                                    padding: '14px 20px 14px 20px',
                                    fontSize: 18,
                                }}
                            >
                                Earn extra income while visiting your favourite
                                destinations
                            </p>
                        </IonText>
                        <IonRow
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <IonButton
                                color="light"
                                style={{
                                    width: 188,
                                    height: 48,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                                onClick={() => setShowCreateGuide(true)}
                            >
                                Learn more
                            </IonButton>
                        </IonRow>
                        <img
                            alt="learn more"
                            src={TourGuide}
                            width="100%"
                            height="150"
                            style={{ objectFit: 'cover', marginTop: 33 }}
                        />
                    </IonCol>
                </IonGrid>
                <IonText color="primary">
                    <h2
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginTop: 47,
                        }}
                    >
                        Discover Experiences
                    </h2>
                </IonText>
                <Loading
                    loading={loading}
                    component={
                        data ? (
                            <ImageCardMediumCarousel>
                                {data?.experiences.map((card) => (
                                    <ImageCardMedium
                                        uri={card.image.uri}
                                        key={card.name}
                                        name={card.name}
                                    />
                                ))}
                            </ImageCardMediumCarousel>
                        ) : null
                    }
                />
            </IonGrid>
            <Footer />
        </IonContent>
    )
}

export default Booking
