import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import bodyParser from 'body-parser';

import { authMiddleware, handleLogin } from './auth.js';
import { readFile } from 'fs/promises';
import { resolvers } from './resolvers.js';
import { getUser } from './db/users.js';


const app = express();
app.use( cors(), express.json(), authMiddleware );

app.post( '/login', handleLogin );

const typeDefs = await readFile( './schema.graphql', 'utf-8' );

const httpServer = http.createServer( app );

const server = new ApolloServer( {
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer( { httpServer } )],
} );

await server.start();

const getContext = async ( { req } ) => {
  if ( req.auth ) {
    const user = await getUser( req.auth.sub )
    return { auth: req.auth, user }
  }
  return {}
}

app.use(
  '/',
  cors(),
  bodyParser.json(),
  expressMiddleware( server, {
    context: getContext,
  } ),
);

// Modified server startup
await new Promise( ( resolve ) => httpServer.listen( { port: 9000 }, resolve ) );
console.log( `🚀 Server ready at http://localhost:9000/` );