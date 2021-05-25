import { gql } from '@apollo/client'
import {
    TagFragment,
    ExperienceFragement,
    DestinationFragment,
    LanguageFragment,
    CityFragment,
    GuideFragment,
    ImageFragment,
    CountryFragment,
    ReviewFragment,
} from '../fragments'

const GuidesQuery = gql`
    query GuidesQuery($input: GuidesInput) {
        guides(input: $input) {
            ...GuideFragment
            city {
                ...CityFragment
            }
            image {
                ...ImageFragment
            }
        }
    }
    ${GuideFragment}
    ${CityFragment}
    ${ImageFragment}
`

const GuideQuery = gql`
    query GuideQuery($id: ID!) {
        guide(guideID: $id) {
            ...GuideFragment
            image {
                ...ImageFragment
            }
            city {
                ...CityFragment
                country {
                    ...CountryFragment
                }
            }
            reviews {
                ...ReviewFragment
            }
            languages {
                ...LanguageFragment
            }
            experiences {
                ...ExperienceFragement
            }
            destinations {
                ...DestinationFragment
            }
            tags {
                ...TagFragment
            }
            recommendations {
                ...GuideFragment
                image {
                    ...ImageFragment
                }
                city {
                    ...CityFragment
                    country {
                        ...CountryFragment
                    }
                }
            }
        }
    }
    ${GuideFragment}
    ${ImageFragment}
    ${CityFragment}
    ${CountryFragment}
    ${ReviewFragment}
    ${LanguageFragment}
    ${ExperienceFragement}
    ${DestinationFragment}
    ${TagFragment}
`

const GuideCreateQuery = gql`
    query GuideCreate {
        tags {
            ...TagFragment
        }
        experiences {
            ...ExperienceFragement
        }
        destinations {
            ...DestinationFragment
        }
        languages {
            ...LanguageFragment
        }
        cities {
            ...CityFragment
        }
    }
    ${TagFragment}
    ${ExperienceFragement}
    ${DestinationFragment}
    ${LanguageFragment}
    ${CityFragment}
`

export { GuideCreateQuery, GuidesQuery, GuideQuery }
