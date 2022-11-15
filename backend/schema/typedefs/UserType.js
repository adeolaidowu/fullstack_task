const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})

module.exports = UserType