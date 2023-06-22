import { ApolloClient, ApolloLink, InMemoryCache, concat, createHttpLink, gql } from '@apollo/client';
import { getAccessToken } from '../auth.js';


// export const client = new GraphQLClient( 'http://localhost:9000/', {
//    headers: () => {
//       const accessToken = getAccessToken()
//       if ( accessToken ) {
//          return {
//             authorization: `Bearer ${accessToken}`
//          }
//       }
//       return {}
//    }
// } );

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
   const { data } = await client.query( { query } )
   return data.jobs;
}


export const getJob = async ( id ) => {
   const query = gql`
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
   const { data } = await client.query( { query, variables: { id } } );
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