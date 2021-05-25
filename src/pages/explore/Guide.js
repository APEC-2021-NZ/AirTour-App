import {
    IonGrid,
    IonIcon,
    IonModal,
    IonRow,
    IonCol,
    IonButton,
    IonLoading,
} from '@ionic/react'
import {
    arrowBack,
    balloonOutline,
    heartOutline,
    languageOutline,
    locationOutline,
    shareOutline,
} from 'ionicons/icons'
import React, { useContext } from 'react'
import styles from 'styled-components'
import ShowMoreText from 'react-show-more-text'
import { useQuery } from '@apollo/client/react'
import { GuideContext } from '../../components/shared/GuideContext'
import { TourGuideColumnCard } from '../../components'
import { AuthContext } from '../../components/AuthProvider'
import { GuideQuery } from '../../graphql/queries/guide'

const CustomModel = styles(IonModal)`
    border-radius: 25px 25px 0px 0px;
`

const CustomIcon = styles(IonIcon)`
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 32px;
    padding: 7px;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`
const Line = styles.hr`
    border-top: 1px solid #C2C2C2;
    margin-right: 5px;
    margin-left: 5px;
`

const ShowMoreDescription = styles(ShowMoreText)`
    font-size: 14px;
`

const GuideDetail = ({ icon, name, description }) => (
    <IonGrid>
        <IonRow>
            <IonIcon
                icon={icon}
                style={{
                    width: 32,
                    height: 32,
                    margin: 'auto',
                    marginTop: 5,
                }}
            />
            <IonCol>
                <p style={{ fontWeight: 500, fontSize: 14, margin: 0 }}>
                    {name}
                </p>
                <p style={{ fontWeight: 300, fontSize: 13, margin: 0 }}>
                    {description}
                </p>
            </IonCol>
        </IonRow>
    </IonGrid>
)

const GuideDescription = ({ description }) => (
    <IonGrid style={{ marginTop: 20, marginBottom: 20 }}>
        <ShowMoreDescription
            lines={3}
            more={
                <>
                    <br />
                    <br />
                    Show more
                </>
            }
            less={
                <>
                    <br />
                    <br />
                    Show less
                </>
            }
        >
            {description}
        </ShowMoreDescription>
    </IonGrid>
)

const Guide = ({ id, wishlist, share }) => {
    const { showModal, isAuthenticated } = useContext(AuthContext)
    const { showGuide, setShowGuide, guideID } = useContext(GuideContext)

    const { data, loading } = useQuery(GuideQuery, {
        variables: {
            id: guideID,
        },
    })

    if (loading || guideID === '') {
        return <IonLoading open={loading} />
    }

    if (data === undefined) {
        return <></>
    }
    const { guide } = data

    const tourGuide = {
        id: 'b0eda78c-e890-42c6-acff-ea8aa323f1a5',
        image: 'https://picsum.photos/id/1025/300/300',
        city: 'Auckland City, New Zealand',
        description: 'Love hiking and tramping in nature',
        rating: 4.97,
        numReviews: 21,
    }

    const tourGuides = new Array(2).fill({
        id: 'b0eda78c-e890-42c6-acff-ea8aa323f1a5',
        image: 'https://picsum.photos/id/1025/300/300',
        city: 'Auckland',
        description: 'Love hiking and tramping in nature',
        rating: 4.97,
        numReviews: 21,
    })
    return (
        <CustomModel
            isOpen={showGuide}
            keyboardClose={false}
            onDidDismiss={() => setShowGuide(false)}
            fullscreen
        >
            <img
                style={{
                    padding: 0,
                    height: 236,
                    objectFit: 'cover',
                }}
                alt={guide.description}
                src={guide.image.uri}
            />
            <IonGrid style={{ maxWidth: 700, padding: '0px 20px 0px 20px' }}>
                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: '24px',
                        marginTop: 32,
                        marginBottom: 0,
                    }}
                >
                    {guide.description}
                </p>
                <p
                    style={{ marginTop: 8, fontSize: 13 }}
                >{`★ ${guide.rating.toFixed(2)} (${guide.numReviews}) - ${
                    guide.city.name
                }, ${guide.city.country.name}`}</p>
                <Line />
                <GuideDetail
                    icon={locationOutline}
                    name="Destinations"
                    description={`${guide.destinations
                        .map((destination) => destination.name)
                        .join(', ')}`}
                />
                <GuideDetail
                    icon={languageOutline}
                    name="Language"
                    description={`${guide.languages
                        .map((language) => language.name)
                        .join(', ')}`}
                />
                <GuideDetail
                    icon={balloonOutline}
                    name="Activites"
                    description={`${guide.experiences
                        .map((experience) => experience.name)
                        .join(', ')}`}
                />

                <Line />
                <GuideDescription description={guide.description} />
                <Line />
                <p
                    style={{
                        fontSize: 20,
                    }}
                >
                    More guides
                </p>
                <IonRow style={{ margin: -10, marginBottom: 20 }}>
                    {tourGuides.map((value) => (
                        <TourGuideColumnCard key={value.id} value={value} />
                    ))}
                </IonRow>
            </IonGrid>
            <CustomIcon
                onClick={() => setShowGuide(false)}
                icon={arrowBack}
                style={{
                    top: 30,
                    left: 20,
                }}
            />
            <CustomIcon
                onClick={shareOutline}
                icon={shareOutline}
                style={{
                    top: 30,
                    right: 80,
                }}
            />
            <CustomIcon
                onClick={wishlist}
                icon={heartOutline}
                style={{
                    top: 30,
                    right: 20,
                }}
            />
            <IonGrid
                style={{
                    position: 'sticky',
                    bottom: 0,
                    height: 66,
                    backgroundColor: 'white',
                    width: '100%',
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                <IonRow>
                    <IonCol>
                        <p
                            style={{
                                margin: 'auto',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            From $10 NZD / hour
                        </p>
                        <p
                            style={{ margin: 3 }}
                        >{`★ ${tourGuide.rating} (${tourGuide.numReviews})`}</p>
                    </IonCol>
                    <IonCol>
                        <IonButton
                            style={{ width: 168 }}
                            onClick={isAuthenticated ? () => {} : showModal}
                        >
                            {isAuthenticated ? 'Connect' : 'Log In'}
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </CustomModel>
    )
}

export default Guide
