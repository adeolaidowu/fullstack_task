import { gql } from "@apollo/client"

export const GET_CUSTOMERS = gql`
    query getCustomers {
        customers{
            id
            name
            business{
                id
                name
                sector
            }
        }
    }
`

export const GET_CUSTOMER = gql`
    query getCustomer($id: ID!) {
        customer(id: $id){
            id
            name
            business{
                name
                sector
            }
        }
    }
`