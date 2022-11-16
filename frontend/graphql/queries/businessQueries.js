import { gql } from "@apollo/client"

export const GET_BUSINESSES = gql`
    query getBusinesses {
        businesses{
            id
            name
            sector
        }
    }
`

export const GET_BUSINESS = gql`
    query getBusiness($id: ID!) {
        business(id: $id){
            id
            name
            email
        }
    }
`