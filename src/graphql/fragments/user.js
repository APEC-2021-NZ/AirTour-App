import { gql } from '@apollo/client'

export default gql`
    fragment UserFragment on User {
        id
        firstname
        surname
        dob
        image {
            uri
        }
    }
`
