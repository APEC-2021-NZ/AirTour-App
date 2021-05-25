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

const Search = ({ show, close, search, setSearch }) => {
    const [city, setCity] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    const { loading, error, data } = useQuery(SearchDestinationsQuery, {
        variables: { input: searchQuery },
    })

    const { data: guidesData } = useQuery(GuidesQuery, {
        variables: { input: { placeID: city } },
    })

    useEffect(() => {
        setCity(null)
    }, [search, show])

    const debouncedSave = useRef(
        debounce((nextValue) => setSearchQuery(nextValue), 1000),
    ).current

    const closeSearch = () => {
        if (city) {
            setCity(null)
        } else {
            close()
        }
    }

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
                    onIonChange={(e) => {
                        setSearch(e.target.value)
                        debouncedSave(e.target.value)
                    }}
                />
                <hr
                    style={{
                        borderTop: '1px solid #C2C2C2',
                        marginRight: 20,
                        marginLeft: 20,
                    }}
                />
                {city ? (
                    <>
                        {loading && <Spinner />}
                        {!loading && !error && (
                            <IonRow style={{ padding: 10 }}>
                                {guidesData?.guides.map((value) => (
                                    <TourGuideColumnCard
                                        key={value.id}
                                        value={value}
                                    />
                                ))}
                            </IonRow>
                        )}
                    </>
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
                        <IonCol style={{ width: '100%' }}>
                            {loading && <Spinner />}
                            {!loading &&
                                !error &&
                                data.searchDestinations.map((item, index) => (
                                    <IonCol
                                        key={item.id}
                                        onClick={() => setCity(item.id)}
                                    >
                                        <p
                                            style={{
                                                marginTop: 0,
                                                fontWeight: 300,
                                                fontSize: 18,
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {item.name}
                                        </p>
                                        {index !==
                                        data.searchDestinations.length - 1 ? (
                                            <hr
                                                style={{
                                                    borderTop:
                                                        '1px solid #C2C2C2',
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
