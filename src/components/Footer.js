import React from 'react'
import { IonGrid, IonCol, IonRow } from '@ionic/react'
import styles from 'styled-components'

const Footer = () => (
    <IonGrid
        style={{
            background: '#F5F5F5',
            overflow: 'scroll',
            minWidth: '100vh',
            padding: 30,
        }}
    >
        <IonCol style={{ minWidth: 230 }}>
            <ForTourists />
        </IonCol>
        <IonCol style={{ minWidth: 230 }}>
            <ForGuides />
        </IonCol>
    </IonGrid>
)

const SubHeader = styles.p`
    font-size: 18;
    font-weight: 300;
    margin-bottom: 40;
`

const SubLink = styles.p`
    font-size: 14;
    font-weight: 400;
    margin-bottom: 50;
`

const ForTourists = () => (
    <>
        <SubHeader>For tourists</SubHeader>
        <SubLink>Become a tourist</SubLink>
        <SubLink>Cancellation options</SubLink>
        <SubLink>Help Centre</SubLink>
    </>
)

const ForGuides = () => (
    <>
        <SubHeader>For guides</SubHeader>
        <SubLink>Become a guide</SubLink>
        <SubLink>Resources for guides</SubLink>
        <SubLink>Touring Locations</SubLink>
    </>
)

export default Footer
