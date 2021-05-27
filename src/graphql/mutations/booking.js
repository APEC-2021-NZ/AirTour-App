import { gql } from '@apollo/client'
import { BookingFragment } from '../fragments'

const CreateBookingMutation = gql`
    mutation CreateBooking($input: CreateBookingInput!) {
        createBooking(input: $input) {
            ...BookingFragment
        }
    }
    ${BookingFragment}
`

const UpdateBookingMutation = gql`
    mutation UpdateBooking($input: UpdateBookingInput!) {
        updateBooking(input: $input) {
            ...BookingFragment
        }
    }
    ${BookingFragment}
`

const BookingMutation = gql`
    mutation Booking($accept: Boolean!) {
        booking(accept: $accept) {
            ...BookingFragment
        }
    }
`

export { CreateBookingMutation, UpdateBookingMutation, BookingMutation }
