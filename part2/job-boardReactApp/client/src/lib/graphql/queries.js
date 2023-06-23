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


export const getJobs = async () => {
   const query = gql`
   query Jobs{
      jobs{
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
   const { data } = await client.query( {
      query,
      fetchPolicy: 'network-only'
   } )
   return data.jobs;
}

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


export const getJob = async ( id ) => {
   const { data } = await client.query( {
      query: jobByIdQuery,
      variables: { id }
   } );
   return data.job;
}

export const getCompany = async ( id ) => {
   const query = gql`
   query ComapanyById ($id:ID!){
      company(id:$id) {
         id
         name
         description
         jobs{
            id
            date
            title
         }
  }
   }
   `
   const { data } = await client.query( { query, variables: { id } } );
   return data.company;
}