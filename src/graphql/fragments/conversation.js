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
        from
        content
        created
        booking {
            ...BookingFragment
        }
        ${BookingFragment}
    }
`

export { ConversationFragment, MessageFragment }
