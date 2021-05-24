import {
    IonContent,
    IonGrid,
    IonIcon,
    IonModal,
    IonRow,
    IonCol,
    IonInput,
} from '@ionic/react'
import { chevronBackOutline, locationOutline, pinOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import styles from 'styled-components'
import { TourGuideColumnCard } from '../../components'

const CustomModel = styles(IonModal)`
    border-radius: 25px 25px 0px 0px;
    height: 100%;
`

const Search = ({ show, close, search, setSearch }) => {
    const [city, setCity] = useState(null)

    useEffect(() => {
        setCity(null)
    }, [search, show])

    const closeSearch = () => {
        if (city) {
            setCity(null)
        } else {
            close()
        }
    }

    const tourGuides = new Array(20).fill({
        id: 'b0eda78c-e890-42c6-acff-ea8aa323f1a5',
        image: 'https://picsum.photos/id/1025/300/300',
        city: 'Auckland',
        description: 'Love hiking and tramping in nature',
        rating: 4.97,
        numReviews: 21,
    })

    const cities = [
        { id: 'b0eda78c-e890-42c', name: 'Auckland, New Zealand' },
        { id: 'b0eda78c-e890-43c', name: 'Wellington, New Zealand' },
        { id: 'b0eda78c-e890-44c', name: 'Queenstown, New Zealand' },
        { id: 'b0eda78c-e890-45c', name: 'Tokyo, Japan' },
    ]

    return (
        <CustomModel isOpen={show} keyboardClose={false} onDidDismiss={close}>
            <IonGrid style={{ marginTop: 25, width: '100%' }}>
                <IonInput
                    value={search}
                    placeholder="Where are you going?"
                    style={{
                        fontSize: 14,
                        minWidth: 100,
                        margin: '0px 20px 0px 35px',
                        width: 'calc(100% - 70px)',
                        overflow: 'show',
                        textAlign: 'center',
                    }}
                    onIonChange={(e) => setSearch(e.target.value)}
                />
                <hr
                    style={{
                        borderTop: '1px solid #C2C2C2',
                        marginRight: 20,
                        marginLeft: 20,
                    }}
                />
                {city ? (
                    <IonRow>
                        {tourGuides.map((value) => (
                            <TourGuideColumnCard key={value.id} value={value} />
                        ))}
                    </IonRow>
                ) : (
                    <IonCol>
                        <IonRow>
                            <IonIcon
                                icon={locationOutline}
                                style={{
                                    width: 32,
                                    height: 32,
                                    padding: 10,
                                    marginLeft: 'auto',
                                }}
                            />
                            <p
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: 18,
                                    margin: 'auto',
                                    marginLeft: 5,
                                }}
                            >
                                Explore nearby destinations
                            </p>
                        </IonRow>
                        <IonCol>
                            {cities.map((item, index) => (
                                <IonCol onClick={() => setCity(item)}>
                                    <p
                                        key={item.name}
                                        style={{
                                            fontWeight: 300,
                                            fontSize: 18,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {item.name}
                                    </p>
                                    {index !== cities.length - 1 ? (
                                        <hr
                                            key={item.name}
                                            style={{
                                                borderTop: '1px solid #C2C2C2',
                                                marginRight: 40,
                                                marginLeft: 40,
                                            }}
                                        />
                                    ) : null}
                                </IonCol>
                            ))}
                        </IonCol>
                    </IonCol>
                )}
            </IonGrid>
            <IonIcon
                onClick={closeSearch}
                icon={chevronBackOutline}
                style={{
                    position: 'absolute',
                    width: 32,
                    height: 32,
                    top: 30,
                    left: 15,
                }}
            />
        </CustomModel>
    )
}

export default Search
