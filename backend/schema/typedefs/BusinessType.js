const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");


const BusinessType = new GraphQLObjectType({
    name: 'Business',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sector: { type: GraphQLString },
    })
})

module.exports = BusinessType