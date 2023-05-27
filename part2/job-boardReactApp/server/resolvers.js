import { GraphQLError } from 'graphql';

import { createJob, getJob, getJobs, getJobsByCompany } from "./db/jobs.js"
import { getCompany } from "./db/companies.js"

export const resolvers = {
   Query: {
      job: async ( _root, args ) => {
         const job = await getJob( args.id )
         if ( !job ) {
            throw new GraphQLError( `Job with id ${args.id} not found`, {
               extensions: { code: 'NOT_FOUND' }
            } )
         }
         // Just a commit to test git
         return job
      },
      jobs: () => getJobs(),
      company: async ( _root, args ) => {
         const company = await getCompany( args.id )
         if ( !company ) {
            throw new GraphQLError( `Company with id ${args.id} not found`, {
               extensions: { code: 'NOT_FOUND' }
            } )
         }
         return company
      }
   },

   Mutation: {
      createJob: ( _root, args ) => {
         const companyId = 'FjcJCHJALA4i'
         const { title, description } = args.input
         return createJob( { companyId, title, description } )
      }
   },


   Job: {
      date: ( job ) => {
         return job.createdAt.toISOString().slice( 0, 'yyyy-mm-dd'.length )
      },
      company: ( job ) => {
         return getCompany( job.companyId )
      }
   },
   Company: {
      jobs: ( company ) => getJobsByCompany( company.id )
   },
}