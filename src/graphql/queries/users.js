import { gql } from '@apollo/client'
import UserFragment from '../fragments/user'

const MeQuery = gql`
    query Me {
        me {
            ...UserFragment
        }
    }
    ${UserFragment}
`

export { MeQuery }
