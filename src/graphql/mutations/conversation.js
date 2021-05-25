import { gql } from '@apollo/client'
import { ConversationFragment } from '../fragments'

const CreateConversationMutation = gql`
    mutation CreateConversation($input: CreateConversationInput!) {
        createConversation(input: $input) {
            ...ConversationFragment
        }
    }
    ${ConversationFragment}
`

export { CreateConversationMutation }
