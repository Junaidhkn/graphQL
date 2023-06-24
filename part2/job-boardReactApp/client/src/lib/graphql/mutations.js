import { gql } from '@apollo/client';

export const createJobMutation = gql`
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

