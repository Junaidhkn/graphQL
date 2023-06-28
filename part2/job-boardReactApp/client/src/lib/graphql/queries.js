import { ApolloClient, ApolloLink, InMemoryCache, concat, createHttpLink, gql } from '@apollo/client';
import { getAccessToken } from '../auth.js';


const httpLink = createHttpLink( {
   uri: 'http://localhost:9000/',
} )


const authMiddleware = new ApolloLink( ( operation, forward ) => {
   // add the authorization to the headers
   const accessToken = getAccessToken();
   operation.setContext( {
      headers: {
         authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
   } );
   return forward( operation );
} );


export const client = new ApolloClient( {
   link: concat( authMiddleware, httpLink ),
   cache: new InMemoryCache(),
   defaultOptions: {
      query: {
         fetchPolicy: 'cache-first'
      },
      watchQuery: {
         fetchPolicy: 'cache-first'
      }
   }
} );

export const getJobsQuery = gql`
   query Jobs($limit:Int, $offset:Int){
      jobs(limit:$limit, offset:$offset){
         id
         title
         date
         company{
            id
            name
         }
      }
   }
`

export const jobByIdQuery = gql`
   query JobById ($id:ID!){
      job(id:$id) {
         date
         title
         description
      company {
         name
         id
    }
  }
   }
   `


export const companyByIdQuery = gql`
   query ComapanyById( $id: ID! ){
   company( id: $id ) {
      id
      name
      description
         jobs{
         id
         date
         title
      }
   }
   }`
