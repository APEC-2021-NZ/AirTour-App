import { gql } from '@apollo/client'
import UserFragment from '../fragments/user'

const MeQuery = gql`
    query Me {
        me {
            ...UserFragment
            guide {
                id
            }
            conversations {
                id
            }
        }
        guides(input: { onWishlist: true }) {
            id
        }
    }
    ${UserFragment}
`

export { MeQuery }
