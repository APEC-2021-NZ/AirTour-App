import React from 'react'
import {
    IonText,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonSlides,
    IonSlide,
} from '@ionic/react'
import styled from 'styled-components'

const DestinationImage = styled(IonCard)`
    width: 90px;
    height: 90px;
    background-image: url(${(props) => props.src});
`

const Booking = () => {
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
                <IonText style={{ color: '#C0C0C0', textAlign: 'center' }}>
                    <p>
                        <u>Get the latest on our COVID-19 Response</u>
                    </p>
                </IonText>
            </IonGrid>
            <IonGrid
                style={{
                    maxWidth: '100%',
                    height: '30vh',
                    backgroundImage: 'url(https://picsum.photos/400)',
                }}
            />
            <IonGrid style={{ padding: '20' }}>
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
