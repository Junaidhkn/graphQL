import { GraphQLError } from 'graphql';

import { createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from "./db/jobs.js"
import { getCompany } from "./db/companies.js"
import { createUser } from './db/users.js';

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
      createJob: ( _root, args, context ) => {
         if ( !context.user ) {
            throw new GraphQLError( `Not Authorized`, {
               extensions: { code: 'UNAUTHORIZED' }
            } )
         }
         const { title, description } = args.input
         return createJob( { companyId: context.user.companyId, title, description } )
      },
      deleteJob: async ( _root, args, context ) => {
         if ( !context.user ) {
            throw new GraphQLError( `Not Authorized`, {
               extensions: { code: 'UNAUTHORIZED' }
            } )
         }
         const job = await deleteJob( args.id, context.user.companyId )
         if ( !job ) {
            throw new GraphQLError( `Company with id ${job.id} not found`, {
               extensions: { code: 'NOT_FOUND' }
            } )
         }
         return job
      },
      updateJob: async ( _root, args, context ) => {
         if ( !context.user ) {
            throw new GraphQLError( `Not Authorized`, {
               extensions: { code: 'UNAUTHORIZED' }
            } )
         }
         const updatedJob = await updateJob( args.input, context.user.companyId )
         if ( !updatedJob ) {
            throw new GraphQLError( `Company with id ${job.id} not found`, {
               extensions: { code: 'NOT_FOUND' }
            } )
         }
         return updatedJob
      },
      createUser: ( _root, args ) => {
         return createUser( args.input )
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