import { gql } from '@apollo/client'
import { GuideFragment } from '../fragments'

const AddToWishlistMutation = gql`
    mutation AddToWishlist($guideID: ID!) {
        addToWishlist(guideID: $guideID) {
            ...GuideFragment
        }
    }
    ${GuideFragment}
`

const RemoveFromWishlistMutation = gql`
    mutation RemoveFromWishlist($guideID: ID!) {
        removeFromWishlist(guideID: $guideID) {
            ...GuideFragment
        }
    }
    ${GuideFragment}
`

export { AddToWishlistMutation, RemoveFromWishlistMutation }
