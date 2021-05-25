import { gql } from '@apollo/client'

export default gql`
    fragment ReviewFragment on Review {
        id
        rating
        description
        created
    }
`
