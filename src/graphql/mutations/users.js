import { gql } from '@apollo/client'
import { UserFragment } from '../fragments'

const CreateUser = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            ...UserFragment
        }
    }
    ${UserFragment}
`

const UpdateUserMutation = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            ...UserFragment
        }
    }
    ${UserFragment}
`

export { CreateUser, UpdateUserMutation }
