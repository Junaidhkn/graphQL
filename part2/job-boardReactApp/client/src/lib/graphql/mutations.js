import { gql } from '@apollo/client';
import { client } from './queries.js';




export const createJob = async ( { title, description } ) => {
   const mutation = gql`
      mutation CreateJob($input: CreateJobInput) {
         job:createJob(input:$input) {
            id
         }
      }
   `

   const { data } = await client.mutate( {
      mutation,
      variables: { input: { title, description } }
   } );
   return data.job;
}