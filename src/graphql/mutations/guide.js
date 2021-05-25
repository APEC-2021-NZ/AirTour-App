import { gql } from '@apollo/client'
import { GuideFragment } from '../fragments'

const CreateGuideMutation = gql`
    mutation CreateGuide($input: CreateGuideInput!) {
        createGuide(input: $input) {
            ...GuideFragment
        }
    }
    ${GuideFragment}
`

const UpdateGuideMutation = gql`
    mutation UpdateGuide($input: UpdateGuideInput!) {
        updateGuide(input: $input) {
            ...GuideFragment
        }
    }
    ${GuideFragment}
`

export { CreateGuideMutation, UpdateGuideMutation }
