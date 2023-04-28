import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


// Type definitions define the "shape" of your data and specify what a client can request / Query

const typeDefs = `#graphql
  type Query {
    greeting: String
  }
`;

// Resolvers define the technique for fetching the types defined, returns the actual value 

const resolvers = {
  Query: {
    greeting: () => 'Hello world!',
  },
};

const server = new ApolloServer( { typeDefs, resolvers } );
const { url } = await startStandaloneServer( server, { listen: { port: 9000 } } );
console.log( `Server running at ${url}` );
