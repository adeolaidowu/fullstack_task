import { gql } from "@apollo/client"

export const DELETE_BUSINESS = gql`
    mutation removeBusiness($id: ID!){
        removeBusiness(id: $id){
            id
            name
        }
    }
`

export const ADD_BUSINESS = gql`
    mutation addBusiness($name: String!, $sector: String!){
        addBusiness(name: $name, sector: $sector){
            id
            name
            sector
        }
    }
`

export const UPDATE_BUSINESS = gql`
    mutation updateBusiness($id: ID!, $name: String!, $sector: String!){
        updateBusiness(id: $id, name: $name, sector: $sector){
            name
            sector
        }
    }
`