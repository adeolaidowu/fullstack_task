require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const port = process.env.PORT || 8080
const app = express()







//const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})