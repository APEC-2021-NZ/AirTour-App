import { gql } from '@apollo/client'
import { BookingFragment, UserFragment, GuideFragment } from '../fragments'

const BookingsQuery = gql`
    query BookingsQuery {
        bookings {
            ...BookingFragment
            tourist {
                ...UserFragment
            }
            guide {
                ...GuideFragment
            }
        }
    }
    ${BookingFragment}
    ${GuideFragment}
    ${UserFragment}
`

const BookingQuery = gql`
    query BookingQuery($bookingID: ID!) {
        booking(bookingID: $bookingID) {
            ...BookingFragment
            tourist {
                ...UserFragment
            }
            guide {
                ...GuideFragment
            }
        }
    }
    ${BookingFragment}
    ${GuideFragment}
    ${UserFragment}
`

export { BookingsQuery, BookingQuery }
