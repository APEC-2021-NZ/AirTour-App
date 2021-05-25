import { gql } from '@apollo/client'
import { CityFragment, DestinationFragment } from '../fragments'

const SearchDestinationsQuery = gql`
    query SearchDestinationsQuery($input: String) {
        searchDestinations(input: $input) {
            ...DestinationFragment
            city {
                ...CityFragment
            }
        }
    }
    ${DestinationFragment}
    ${CityFragment}
`

export { SearchDestinationsQuery }
