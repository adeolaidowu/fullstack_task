import { gql } from "@apollo/client"

export const DELETE_CUSTOMER = gql`
    mutation removeCustomer($id: ID!){
        removeCustomer(id: $id){
            id
            name
        }
    }
`

export const ADD_CUSTOMER = gql`
    mutation addCustomer($name: String!, $businessId: ID!){
        addCustomer(name: $name, businessId: $businessId){
            id
            name
            business{
                name
            }
        }
    }
`

export const UPDATE_CUSTOMER = gql`
    mutation updateCustomer($id: ID!, $name: String!, $businessId: ID!){
        updateCustomer(id: $id, name: $name, businessId: $businessId){
            name
            business{
                name
            }
        }
    }
`