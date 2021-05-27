import { gql } from '@apollo/client'
import {
    ConversationFragment,
    UserFragment,
    GuideFragment,
    MessageFragment,
} from '../fragments'

const ConversationQuery = gql`
    query ConversationQuery($conversationID: ID!, $limit: Int!, $offset: Int!) {
        conversation(input: $input) {
            ...ConversationFragment
            user {
                ...UserFragment
            }
            guide {
                ...GuideFragment
            }
            messages(limit: $limit, offset: $offset) {
                ...MessageFragment
            }
        }
    }
    ${ConversationFragment}
    ${UserFragment}
    ${GuideFragment}
    ${MessageFragment}
`

const ConverstationsQuery = gql`
    query ConverstationsQuery {
        me {
            conversations {
                ...ConversationFragment
                user {
                    ...UserFragment
                }
                guide {
                    ...GuideFragment
                }
            }
        }
    }
    ${ConversationFragment}
    ${UserFragment}
    ${GuideFragment}
`

export { ConversationQuery, ConverstationsQuery }
