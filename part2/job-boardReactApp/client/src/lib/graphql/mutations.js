import { gql } from 'graphql-request'
import { client } from './queries.js';




export const createJob = async ( { title, description } ) => {
   const mutation = gql`
      mutation CreateJob($input: CreateJobInput) {
         job:createJob(input:$input) {
            id
         }
      }
   `

   const { job } = await client.request( mutation, { input: { title, description } } );
   return job;
}