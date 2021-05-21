import { gql } from '@apollo/client'

const LanguageFragment = gql`
    fragment LanguageFragment on Language {
        id
        name
    }
`

const ExperienceFragement = gql`
    fragment ExperienceFragement on Experience {
        id
        name
        image
    }
`

const DestinationFragment = gql`
    fragment DestinationFragment on Destination {
        id
        name
        image
    }
`

const TagFragment = gql`
    fragment TagFragment on Tag {
        id
        name
        image
    }
`

const ImageFragment = gql`
    fragment ImageFragment on Image {
        uri
    }
`

export {
    LanguageFragment,
    ExperienceFragement,
    DestinationFragment,
    TagFragment,
    ImageFragment,
}
