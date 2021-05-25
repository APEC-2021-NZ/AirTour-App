import { gql } from '@apollo/client'
import { ReviewFragment } from '../fragments'

const ReviewMutation = gql`
    mutation Review($input: ReviewInput!) {
        review(input: $input) {
            ...ReviewFragment
        }
    }
    ${ReviewFragment}
`

export { ReviewMutation }
