import { gql } from '@apollo/client'
import {
    TagFragment,
    ExperienceFragement,
    DestinationFragment,
} from '../fragments'

const SearchDestinationsQuery = gql`
    query SearchDestinationsQuery($input: String) {
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

export { SearchDestinationsQuery }
