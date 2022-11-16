import { ApolloClient, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                users: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                customers: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                business: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }
})

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache,
});

export default client;