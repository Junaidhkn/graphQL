import { GraphQLClient, gql } from 'graphql-request'


const client = new GraphQLClient( 'http://localhost:9000/' );


export const getJobs = async () => {
   const query = gql`
   query{
      jobs{
         id
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