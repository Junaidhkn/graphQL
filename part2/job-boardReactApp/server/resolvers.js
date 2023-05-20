import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js"
import { getCompany } from "./db/companies.js"

export const resolvers = {
   Query: {
      job: ( _root, args ) => getJob( args.id ),
      jobs: () => getJobs(),
      company: ( _root, args ) => getCompany( args.id )
   },
   Job: {
      date: ( job ) => {
         return job.createdAt.toISOString().slice( 0, 'yyyy-mm-dd'.length )
      },
      company: ( job ) => {
         return getCompany( job.id, job.companyId )
      }
   },
   Company: {
      jobs: ( company ) => getJobsByCompany( company.id )
   }

}