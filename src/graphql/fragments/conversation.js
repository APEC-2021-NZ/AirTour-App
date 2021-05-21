import { gql } from '@apollo/client'

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
    }
`

export { ConversationFragment, MessageFragment }
