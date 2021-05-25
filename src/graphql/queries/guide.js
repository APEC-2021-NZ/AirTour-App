import { gql } from '@apollo/client'
import {
    TagFragment,
    ExperienceFragement,
    DestinationFragment,
    LanguageFragment,
    CityFragment,
    GuideFragment,
    ImageFragment,
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
        guide(id: $id) {
            ...GuideFragment
        }
    }
    ${GuideFragment}
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
