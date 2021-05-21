import { gql } from '@apollo/client'

export default gql`
    fragment BookingFragment on Booking {
        id
        startTime
        endTime
        description
        confirmedTourist
        confirmedGuide
        price
        created
    }
`
