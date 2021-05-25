import { gql } from '@apollo/client'

const CityFragment = gql`
    fragment CityFragment on City {
        id
        name
        country
    }
`

const CountryFragment = gql`
    fragment CountryFragment on Country {
        id
        name
    }
`

export { CityFragment, CountryFragment }
