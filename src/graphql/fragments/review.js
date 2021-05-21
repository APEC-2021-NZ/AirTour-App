import { gql } from '@apollo/client'

export default gql`
    fragment ReviewFragment on Review {
        id
        active
        blurb
        description
        rating
        numReviews
        price
    }
`
