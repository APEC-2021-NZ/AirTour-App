import { gql } from '@apollo/client'

const CountryFragment = gql`
    fragment CountryFragment on Country {
        id
        name
    }
`

const CityFragment = gql`
    fragment CityFragment on City {
        id
        name
        country {
            ...CountryFragment
        }
    }
    ${CountryFragment}
`

export { CityFragment, CountryFragment }
