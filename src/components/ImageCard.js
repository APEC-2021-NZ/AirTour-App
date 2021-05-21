import React from 'react'
import { IonCol, IonGrid, IonRow } from '@ionic/react'
import Carousel from 'react-multi-carousel'

const ImageCardSmallCarousel = ({ children }) => {
    const responsive = {
        desktop2: {
            breakpoint: { max: 1500, min: 1280 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1280, min: 800 },
            items: 3,
        },
        tablet2: {
            breakpoint: { max: 800, min: 500 },
            items: 2,
            partialVisibilityGutter: 40,
        },
        tablet1: {
            breakpoint: { max: 500, min: 400 },
            items: 2,
            partialVisibilityGutter: 0,
        },
        mobile: {
            breakpoint: { max: 400, min: 300 },
            items: 1,
            partialVisibilityGutter: 40,
        },
        small: {
            breakpoint: { max: 300, min: 0 },
            items: 1,
        },
    }

    return (
        <Carousel arrows={false} responsive={responsive} partialVisible>
            {children}
        </Carousel>
    )
}

const ImageCardMediumCarousel = ({ children }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 1500, min: 1000 },
            items: 3,
        },
        tablet2: {
            breakpoint: { max: 1000, min: 800 },
            items: 2,
            partialVisibilityGutter: 100,
        },
        tablet: {
            breakpoint: { max: 800, min: 600 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 600, min: 350 },
            items: 1,
            partialVisibilityGutter: 100,
        },
        small: {
            breakpoint: { max: 350, min: 0 },
            items: 1,
        },
    }

    return (
        <Carousel arrows={false} responsive={responsive} partialVisible>
            {children}
        </Carousel>
    )
}

const ImageCardMedium = ({ name, uri, onSelect }) => (
    <IonCol onClick={onSelect} style={{ padding: 0 }}>
        <img
            alt={name}
            src={uri}
            style={{
                height: 200,
                width: 200,
                borderRadius: '15px',
            }}
        />
        <p style={{ fontWeight: 'bold', fontSize: 13 }}>{name}</p>
    </IonCol>
)

const ImageCardSmall = ({ name, description, uri, onSelect }) => (
    <IonRow onClick={onSelect}>
        <img
            alt={name}
            src={uri}
            style={{
                height: 90,
                width: 90,
                borderRadius: '15px',
            }}
        />
        <IonGrid>
            <p style={{ fontWeight: 'bold', fontSize: 13 }}>{name}</p>
            <p style={{ fontSize: 11 }}>{description}</p>
        </IonGrid>
    </IonRow>
)

export {
    ImageCardSmallCarousel,
    ImageCardMediumCarousel,
    ImageCardSmall,
    ImageCardMedium,
}
