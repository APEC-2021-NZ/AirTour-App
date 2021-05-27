import { gql } from '@apollo/client'
import { MessageFragment } from '../fragments'

const MessageMutation = gql`
    mutation Message($input: MessageInput!) {
        message(input: $input) {
            ...MessageFragment
        }
    }
    ${MessageFragment}
`

export { MessageMutation }
