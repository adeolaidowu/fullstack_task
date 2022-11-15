const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const BusinessType = require("./BusinessType");
const { business } = require('../../sample-data')

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        business: {
            type: BusinessType,
            resolve(parent, args) {
                return business.find(b => b.id === parent.businessId)
            }
        }
    })
})

module.exports = CustomerType