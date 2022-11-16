import { gql } from "@apollo/client"

export const DELETE_USER = gql`
    mutation removeUser($id: ID!){
        removeUser(id: $id){
            id
            name
            email
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!){
        addUser(name: $name, email: $email, password: $password){
            id
            name
            email
        }
    }
`

export const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $name: String!, $email: String!){
        updateUser(id: $id, name: $name, email: $email){
            name
            email
        }
    }
`