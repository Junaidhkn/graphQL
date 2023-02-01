import { Job, Company } from './db.js';

export const resolvers = {
	Query: {
		job: ( _root, { id } ) => Job.findById( id ),
		jobs: () => Job.findAll(),
		company: ( _root, { id } ) => Company.findById( id )
	},

	Mutation: {
		createJob: ( _root, { input } ) => {
			return Job.create( input )
		},
		deleteJob: ( _root, { id } ) => {
			return Job.delete( id )
		},
		updateJob: ( _root, { input } ) => {
			return Job.update( input )
		}
	},

	Company: {
		jobs: ( company ) => Job.findAll( ( job ) => job.companyId === company.id )
	},

	Job: {
		company: ( job ) => {
			return Company.findById( job.companyId )
		}
	}
};
