import { gql } from '@apollo/client';
import { client, jobByIdQuery } from './queries.js';




export const createJob = async ( { title, description } ) => {
   const mutation = gql`
      mutation CreateJob($input: CreateJobInput) {
         job:createJob(input:$input) {
            id
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

   const { data } = await client.mutate( {
      mutation,
      variables: { input: { title, description } },
      update: ( cache, { data } ) => {
         cache.writeQuery( {
            query: jobByIdQuery,
            variables: { id: data.job.id },
            data: data
         } )
      }
   } );
   return data.job;
}