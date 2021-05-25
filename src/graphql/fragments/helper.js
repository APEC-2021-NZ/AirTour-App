import { gql } from '@apollo/client'

const ImageFragment = gql`
    fragment ImageFragment on Image {
        uri
    }
`

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
        image {
            ...ImageFragment
        }
    }
    ${ImageFragment}
`

const DestinationFragment = gql`
    fragment DestinationFragment on Destination {
        id
        name
        image {
            ...ImageFragment
        }
    }
    ${ImageFragment}
`

const TagFragment = gql`
    fragment TagFragment on Tag {
        id
        name
        image {
            ...ImageFragment
        }
    }
    ${ImageFragment}
`

export {
    LanguageFragment,
    ExperienceFragement,
    DestinationFragment,
    TagFragment,
    ImageFragment,
}
