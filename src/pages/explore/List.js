import { useQuery } from '@apollo/client'
import {
    IonSpinner,
    IonGrid,
    IonIcon,
    IonModal,
    IonRow,
    IonCol,
    IonInput,
} from '@ionic/react'
import { chevronBackOutline, locationOutline, pinOutline } from 'ionicons/icons'
import React, { useEffect, useState, useRef } from 'react'
import debounce from 'lodash.debounce'
import styles from 'styled-components'
import { TourGuideColumnCard } from '../../components'
import { SearchDestinationsQuery } from '../../graphql/queries/destination'
import { GuidesQuery } from '../../graphql/queries/guide'

const CustomModel = styles(IonModal)`
    border-radius: 25px 25px 0px 0px;
    height: 100%;
`

const Spinner = () => (
    <div
        style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}
    >
        <IonSpinner
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            center
            name="crescent"
        />
    </div>
)

const List = ({ show, close, input, search }) => {
    const { loading, error, data } = useQuery(GuidesQuery, {
        variables: { input },
    })

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
                    disabled
                />
                <hr
                    style={{
                        borderTop: '1px solid #C2C2C2',
                        marginRight: 20,
                        marginLeft: 20,
                    }}
                />
                <>
                    {loading && <Spinner />}
                    {!loading && !error && (
                        <IonRow style={{ padding: 10 }}>
                            {data?.guides.length === 0 ? (
                                <p> No guides available </p>
                            ) : null}
                            {data?.guides.map((value) => (
                                <TourGuideColumnCard
                                    key={value.id}
                                    value={value}
                                />
                            ))}
                        </IonRow>
                    )}
                </>
            </IonGrid>
            <IonIcon
                onClick={close}
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

export default List
