import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import { readFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import { User } from './db.js';
import { resolvers } from './resolvers.js';


const JWT_SECRET = Buffer.from( 'Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64' );

const app = express();
app.use( cors(), express.json(), expressjwt( {
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret: JWT_SECRET,
} ) );

app.post( '/login', async ( req, res ) => {
  const { email, password } = req.body;
  const user = await User.findOne( ( user ) => user.email === email );
  if ( user && user.password === password ) {
    const token = jwt.sign( { sub: user.id }, JWT_SECRET );
    res.json( { token } );
  } else {
    res.sendStatus( 401 );
  }
} );

const typeDefs = await readFile( './schema.graphql', 'utf-8' );

const context = async ( { req } ) => {
  if ( req.auth ) {
    const user = await User.findById( req.auth.sub );
    return { user };
  }
  return {};
};

const httpServer = http.createServer( app );



const server = new ApolloServer( {
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer( { httpServer } )],
} );

await server.start()

app.use(
  '/',
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware( server, {
    context: context
  }
  ) )


await new Promise( ( resolve ) => httpServer.listen( { port: 9000 }, resolve ) );
console.log( `🚀 Server ready at http://localhost:9000/` );

// const server = new ApolloServer( {
//   typeDefs,
//   resolvers,
//   context
// } );

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// const PORT = 9000;
// const { url } = await startStandaloneServer( server, {
//   listen: { port: PORT },
// } );

// app.listen( '8000', () => {
//   console.log( '🚀  Express Server ready at PORT 8000 ' );
// } )
// console.log( `🚀  Server ready at: ${url}` );