import { gql } from '@apollo/client'
import {
    TagFragment,
    ExperienceFragement,
    DestinationFragment,
} from '../fragments'

const ExploreQuery = gql`
    query Explore {
        tags {
            ...TagFragment
        }
        experiences {
            ...ExperienceFragement
        }
        destinations {
            ...DestinationFragment
        }
    }
    ${TagFragment}
    ${ExperienceFragement}
    ${DestinationFragment}
`

export { ExploreQuery }
