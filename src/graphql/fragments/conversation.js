import { gql } from '@apollo/client'
import BookingFragment from './booking'

const ConversationFragment = gql`
    fragment ConversationFragment on Conversation {
        id
        created
    }
`

const MessageFragment = gql`
    fragment MessageFragment on Message {
        id
        from {
            id
            firstname
        }
        content
        created
        booking {
            ...BookingFragment
        }
    }
    ${BookingFragment}
`

export { ConversationFragment, MessageFragment }
