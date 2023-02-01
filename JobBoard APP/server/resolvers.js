import { Job, Company } from './db.js';

export const resolvers = {
	Query: {
		job: ( _root, { id } ) => Job.findById( id ),
		jobs: () => Job.findAll(),
		company: ( _root, { id } ) => Company.findById( id )
	},

	Mutation: {
		createJob: ( _root, { input }, context ) => {
			console.log( context );
			if ( !context.user ) {
				throw new Error( 'Unauthourized' )
			}
			return Job.create( { ...input, companyId: context.user.companyId } )
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
