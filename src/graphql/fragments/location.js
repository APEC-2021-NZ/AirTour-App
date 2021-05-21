import { gql } from '@apollo/client'

const CityFragment = gql`
    fragment CityFragment on City {
        id
        name
        country
    }
`

const CountryFragement = gql`
    fragment CountryFragement on Country {
        id
        name
    }
`

export { CityFragment, CountryFragement }
