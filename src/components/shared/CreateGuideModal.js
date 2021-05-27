import { useMutation, useQuery } from '@apollo/client'
import {
    IonButton,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonModal,
    IonRow,
    IonText,
    IonTextarea,
} from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import React, { useContext, useState } from 'react'
import { CreateGuideMutation } from '../../graphql/mutations/guide'
import { GuideCreateQuery, GuideQuery } from '../../graphql/queries/guide'
import { AuthContext } from '../AuthProvider'
import { GuideContext } from './GuideContext'
import SearchableSelect from './SearchableSelect'
import { ToastContext } from './ToastProvider'

const buttonStyle = {
    '--color': '#009EA8',
    '--color-activated': '#009EA8',
    '--border-color': '#009EA8',
    '--border-radius': '5px',
    '--border-width': '2px',
    '--background-activated': 'white',
    width: '100%',
}

const BorderItem = ({ children }) => (
    <IonItem
        style={{
            border: '1px solid #979797',
            borderRadius: '10px',
            padding: '5px',
            margin: '5px',
        }}
        lines="none"
        position="stacked"
    >
        {children}
    </IonItem>
)

const SmallText = ({ children }) => (
    <IonText>
        <p
            style={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '200',
                fontSize: '11px',
                lineHeight: '13px',
            }}
        >
            {children}
        </p>
    </IonText>
)

const Unauthenticated = () => {
    const { showModal } = useContext(AuthContext)
    const { showCreateGuide, setShowCreateGuide } = useContext(GuideContext)

    const handleClose = () => setShowCreateGuide(false)

    return (
        <IonModal isOpen={showCreateGuide} onDidDismiss={handleClose}>
            <IonGrid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '360px',
                    marginTop: '75px',
                }}
            >
                <IonRow>
                    <IonText color="primary">
                        <h2
                            style={{
                                fontFamily: 'Comfortaa',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontSize: '24px',
                                lineHeight: '27px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '-0.015em',
                                padding: '5px',
                            }}
                        >
                            Become a Guide
                        </h2>
                    </IonText>
                </IonRow>

                <IonRow>
                    <IonText color="primary">
                        <p
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '200',
                                fontSize: '14px',
                                lineHeight: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '0.04em',
                                padding: '5px',
                            }}
                        >
                            Anyone can become a guide, all you need to do is
                            login or sign up.
                        </p>
                    </IonText>
                </IonRow>

                <IonButton
                    fill="clear"
                    onClick={handleClose}
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                    }}
                >
                    <IonIcon icon={closeOutline} />
                </IonButton>
            </IonGrid>
        </IonModal>
    )
}

const Authenticated = () => {
    const { data, loading: isGuideLoading } = useQuery(GuideCreateQuery)
    const [createGuide, _] = useMutation(CreateGuideMutation)
    const { showCreateGuide, setShowCreateGuide } = useContext(GuideContext)
    const { refresh } = useContext(AuthContext)
    const { showToast } = useContext(ToastContext)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [blurb, setBlurb] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState(null)
    const [languages, setLanguages] = useState([])
    const [experiences, setExperiences] = useState([])
    const [destinations, setDestinations] = useState([])
    const [tags, setTags] = useState([])

    const handleSubmit = async () => {
        if (!blurb) {
            setError('A blurb is required')
            return
        }

        if (!price) {
            setError('A price is required')
            return
        }

        if (!description) {
            setError('A description is required')
            return
        }

        if (!city) {
            setError('A city is required')
            return
        }

        if (!languages.length) {
            setError('At least one language is required')
            return
        }

        if (!experiences.length) {
            setError('At least one experience is required')
            return
        }

        if (!destinations.length) {
            setError('At least one destination is required')
            return
        }

        if (!tags.length) {
            setError('At least one tag is required')
            return
        }

        try {
            await createGuide({
                variables: {
                    input: {
                        active: true,
                        cityID: city.id,
                        blurb,
                        description,
                        price,
                        languageIDs: languages.map((l) => l.id),
                        experienceIDs: experiences.map((m) => m.id),
                        destinationIDs: destinations.map((d) => d.id),
                        tagIDs: tags.map((t) => t.id),
                    },
                },
            })
            setError('')
            setShowCreateGuide(false)
            showToast({
                message: 'Guide registration complete!',
                color: 'success',
            })
            refresh()
        } catch (e) {
            console.error(e)
            setError('Something went wrong. Please try again later.')
        }
    }

    const handleClose = () => {
        if (!loading) {
            setBlurb(null)
            setPrice(null)
            setDescription(null)
            setCity(null)
            setLanguages([])
            setExperiences([])
            setDestinations([])
            setTags([])
            setShowCreateGuide(false)
        }
    }

    if (isGuideLoading) {
        return <IonLoading isOpen />
    }

    return (
        <IonModal isOpen={showCreateGuide} onDidDismiss={handleClose}>
            <IonGrid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '360px',
                    marginTop: '75px',
                }}
            >
                <IonRow>
                    <IonText color="primary">
                        <h2
                            style={{
                                fontFamily: 'Comfortaa',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontSize: '24px',
                                lineHeight: '27px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '-0.015em',
                                padding: '5px',
                            }}
                        >
                            Become a Guide
                        </h2>
                    </IonText>
                </IonRow>

                <IonRow>
                    <IonText color="primary">
                        <p
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '200',
                                fontSize: '14px',
                                lineHeight: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '0.04em',
                                padding: '5px',
                            }}
                        >
                            Fill in the following to register yourself as a
                            guide
                        </p>
                    </IonText>
                </IonRow>

                <BorderItem>
                    <IonLabel position="stacked">Blurb</IonLabel>
                    <IonInput
                        value={blurb}
                        onIonChange={(e) => setBlurb(e.detail.value)}
                    />
                </BorderItem>

                <SmallText>Your blurb should be clear and concise.</SmallText>

                <BorderItem>
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonTextarea
                        value={description}
                        autoGrow
                        onIonChange={(e) => setDescription(e.detail.value)}
                    />
                </BorderItem>

                <BorderItem>
                    <IonLabel position="stacked">Price</IonLabel>
                    <IonInput
                        value={price}
                        onIonChange={(e) => setPrice(e.detail.value)}
                    />
                </BorderItem>

                <SearchableSelect
                    value={city}
                    onChange={setCity}
                    getOptionName={(item) => item.name}
                    placeholder="City"
                    options={data.cities}
                    searchKeys={['name']}
                />

                <SearchableSelect
                    value={languages}
                    onChange={setLanguages}
                    getOptionName={(item) => item.name}
                    placeholder="Languages"
                    options={data.languages}
                    searchKeys={['name']}
                    multiple
                />

                <SearchableSelect
                    value={experiences}
                    onChange={setExperiences}
                    getOptionName={(item) => item.name}
                    placeholder="Experiences"
                    options={data.experiences}
                    searchKeys={['name']}
                    multiple
                />

                <SearchableSelect
                    value={destinations}
                    onChange={setDestinations}
                    getOptionName={(item) => item.name}
                    placeholder="Destinations"
                    options={data.destinations}
                    searchKeys={['name']}
                    multiple
                />

                <SearchableSelect
                    value={tags}
                    onChange={setTags}
                    getOptionName={(item) => item.name}
                    placeholder="Tags"
                    options={data.tags}
                    searchKeys={['name']}
                    multiple
                />

                {error && (
                    <IonRow
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <IonText color="danger">
                            <p
                                style={{
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    letterSpacing: '0.04em',
                                    textAlign: 'center',
                                }}
                            >
                                {error}
                            </p>
                        </IonText>
                    </IonRow>
                )}

                <IonRow>
                    <IonButton
                        onClick={handleSubmit}
                        fill="outline"
                        style={buttonStyle}
                        disabled={loading}
                    >
                        Submit
                    </IonButton>
                </IonRow>

                <IonLoading isOpen={loading} />

                <IonButton
                    fill="clear"
                    onClick={handleClose}
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                    }}
                >
                    <IonIcon icon={closeOutline} />
                </IonButton>
            </IonGrid>
        </IonModal>
    )
}

const Registered = () => {
    const { showCreateGuide, setShowCreateGuide } = useContext(GuideContext)

    const handleClose = () => setShowCreateGuide(false)

    return (
        <IonModal isOpen={showCreateGuide} onDidDismiss={handleClose}>
            <IonGrid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '360px',
                    marginTop: '75px',
                }}
            >
                <IonRow>
                    <IonText color="primary">
                        <h2
                            style={{
                                fontFamily: 'Comfortaa',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontSize: '24px',
                                lineHeight: '27px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '-0.015em',
                                padding: '5px',
                            }}
                        >
                            Become a Guide
                        </h2>
                    </IonText>
                </IonRow>

                <IonRow>
                    <IonText color="primary">
                        <p
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '200',
                                fontSize: '14px',
                                lineHeight: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '0.04em',
                                padding: '5px',
                            }}
                        >
                            You&apos;re already registered as a guide.
                        </p>
                    </IonText>
                </IonRow>

                <IonButton
                    fill="clear"
                    onClick={handleClose}
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                    }}
                >
                    <IonIcon icon={closeOutline} />
                </IonButton>
            </IonGrid>
        </IonModal>
    )
}

const CreateGuideModal = () => {
    const { isAuthenticated, user } = useContext(AuthContext)

    if (user?.guide) {
        return <Registered />
    }

    return isAuthenticated ? <Authenticated /> : <Unauthenticated />
}

export default CreateGuideModal
