import { gql } from '@apollo/client'
import {
    ConversationFragment,
    UserFragment,
    GuideFragment,
    MessageFragment,
} from '../fragments'

const ConversationQuery = gql`
    query ConversationQuery($conversationID: ID!, $limit: Int!, $offset: Int!) {
        conversation(conversationID: $conversationID) {
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
                    user {
                        ...UserFragment
                    }
                }
                messages(limit: 1, offset: 0) {
                    ...MessageFragment
                }
            }
        }
    }
    ${ConversationFragment}
    ${UserFragment}
    ${GuideFragment}
    ${MessageFragment}
`

export { ConversationQuery, ConverstationsQuery }
