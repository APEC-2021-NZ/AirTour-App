import { gql } from '@apollo/client'

export default gql`
    fragment GuideFragment on Guide {
        id
        active
        blurb
        description
        rating
        numReviews
        price
    }
`
