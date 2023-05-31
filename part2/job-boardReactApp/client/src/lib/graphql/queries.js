import { GraphQLClient, gql } from 'graphql-request'
import { getAccessToken } from '../auth.js';


export const client = new GraphQLClient( 'http://localhost:9000/', {
   headers: () => {
      const accessToken = getAccessToken()
      if ( accessToken ) {
         return {
            authorization: `Bearer ${accessToken}`
         }
      }
      return {}
   }
} );


export const getJobs = async () => {
   const query = gql`
   query{
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
   const { jobs } = await client.request( query );
   return jobs;
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
   const { job } = await client.request( query, { id } );
   return job;
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
   const { company } = await client.request( query, { id } );
   return company;
}