import { gql } from '@apollo/client'
import UserFragment from '../fragments/user'

const CreateUser = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            ...UserFragment
        }
    }
    ${UserFragment}
`

export { CreateUser }
