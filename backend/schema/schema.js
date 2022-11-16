const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')
const UserType = require('./typedefs/UserType')
const BusinessType = require('./typedefs/BusinessType')
const CustomerType = require('./typedefs/CustomerType')
const { customers, users, business } = require('../sample-data')

// Queries
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // get all users
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users
            }
        },
        // get single user by id
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return users.find(user => user.id == args.id)
            }
        },
        // get all customers
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                return customers
            }
        },
        // get single customer by id
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return customers.find(customer => customer.id == args.id)
            }
        },
        // get all business
        businesses: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return business
            }
        },
        // get single business by id
        business: {
            type: BusinessType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return business.find(b => b.id == args.id)
            }
        }
    }
})

// Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // add a user
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                const lastUser = users[users.length - 1]
                const newUser = {
                    id: Number(lastUser.id) + 1,
                    name: args.name,
                    email: args.email,
                    password: args.password
                }
                users.push(newUser)
                return newUser
            }
        },
        // update a user
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let updatedUser = users.find(user => user.id == args.id)
                updatedUser.name = args.name == "" ? updatedUser.name : args.name;
                updatedUser.email = args.email == "" ? updatedUser.email : args.email;
                users.forEach((user, index) => {
                    if (user.id == args.id) {
                        users[index] = updatedUser
                        return
                    }
                })
                return updatedUser
            }
        },
        // delete a user
        removeUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let userToDelete;
                users.forEach((user, index) => {
                    if (user.id == args.id) {
                        userToDelete = user;
                        users.splice(index, 1)
                    }
                    return
                })
                return userToDelete
            }
        },

        // add a business
        addBusiness: {
            type: BusinessType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                sector: { type: GraphQLString },
            },
            resolve(parent, args) {
                const lastBusiness = business[business.length - 1]
                const newBusiness = {
                    id: Number(lastBusiness.id) + 1,
                    name: args.name,
                    sector: args.sector
                }
                business.push(newBusiness)
                return newBusiness
            }
        },
        // update a business
        updateBusiness: {
            type: BusinessType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                sector: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let updatedBusiness = business.find(b => b.id == args.id)
                updatedBusiness.name = args.name == "" ? updatedBusiness.name : args.name;
                updatedBusiness.sector = args.sector == "" ? updatedBusiness.sector : args.sector;
                business.forEach((b, index) => {
                    if (b.id == args.id) {
                        business[index] = updatedBusiness
                        return
                    }
                })
                return updatedBusiness
            }
        },
        // delete a business
        removeBusiness: {
            type: BusinessType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let businessToDelete;
                business.forEach((b, index) => {
                    if (b.id == args.id) {
                        businessToDelete = b;
                        business.splice(index, 1)
                    }
                    return
                })
                return businessToDelete
            }
        },

        // add a customer
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                businessId: { type: GraphQLID },
            },
            resolve(parent, args) {
                const lastCustomer = customers[customers.length - 1]
                const newCustomer = {
                    id: Number(lastCustomer.id) + 1,
                    name: args.name,
                    businessId: args.businessId
                }
                customers.push(newCustomer)
                return newCustomer
            }
        },
        // update a customer
        updateCustomer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                businessId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let updatedCustomer = customers.find(customer => customer.id == args.id)
                updatedCustomer.name = args.name == "" ? updatedCustomer.name : args.name;
                updatedCustomer.businessId = args.businessId == "" ? updatedCustomer.businessId : args.businessId;
                customers.forEach((customer, index) => {
                    if (customer.id == args.id) {
                        customers[index] = updatedCustomer
                        return
                    }
                })
                return updatedCustomer
            }
        },
        // delete a customer
        removeCustomer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let customerToDelete;
                customers.forEach((customer, index) => {
                    if (customer.id == args.id) {
                        customerToDelete = customer;
                        customers.splice(index, 1)
                    }
                    return
                })
                return customerToDelete
            }
        }
    }
})


const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })

module.exports = schema