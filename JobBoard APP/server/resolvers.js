import { Job,Company } from './db.js';

export const resolvers = {
	Query: {
		jobs: () => Job.findAll()
	},

	Job:{
		company:(job)=>{
			return Company.findById(job.companyId)
		}
	}
};
