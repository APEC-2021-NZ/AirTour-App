import React, { useState } from 'react'
import {
    IonText,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonIcon,
    IonInput,
    IonCard,
    IonSlides,
    IonSlide,
} from '@ionic/react'
import { searchOutline } from 'ionicons/icons'
import styled from 'styled-components'

const DestinationImage = styled(IonCard)`
    width: 90px;
    height: 90px;
    background-image: url(${(props) => props.src});
`

const Booking = () => {
    const [search, setSearch] = useState('')
    const slideOpts = {
        initialSlide: 1,
        speed: 400,
    }
    const test = [1, 2, 3]
    return (
        <IonContent>
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
                            left: 100,
                        }}
                    />
                    <IonInput
                        value={search}
                        placeholder="Where are you going?"
                        style={{ fontSize: 14, width: 100 }}
                        onIonChange={(e) => setSearch(e.target.value)}
                    />
                </IonRow>
            </IonGrid>
            <IonGrid style={{ padding: '0 20 0 20' }}>
                <IonText color="primary">
                    <h2>Explore nearby</h2>
                </IonText>
                <IonSlides pager options={slideOpts}>
                    {test.map((card) => (
                        <IonSlide>
                            <DestinationImage src="https://picsum.photos/90" />
                        </IonSlide>
                    ))}
                </IonSlides>
                <IonText color="primary">
                    <h2>Go anywhere</h2>
                </IonText>
            </IonGrid>
        </IonContent>
    )
}

export default Booking
