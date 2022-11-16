import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client"
import client from "../graphql/apolloClient"
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {



  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
