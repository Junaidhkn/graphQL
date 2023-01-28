import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

   schema{
      query:Query
   }



type Query {
    greetings:String
  }
`;

const resolvers = {
   Query: {
      greetings: () => 'Hello From GraphQL'
   }

}


const server = new ApolloServer( { typeDefs, resolvers } );


const { url } = await startStandaloneServer( server, {
   listen: { port: 9000 },
} );

console.log( `🚀  Server ready at: ${url}` );