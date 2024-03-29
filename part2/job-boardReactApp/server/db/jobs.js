import { prisma } from "../seed.js";


export async function getJobs ( limit, offset ) {
  return await prisma.job.findMany( { orderBy: { createdAt: 'desc' }, take: limit, skip: offset } );
}

export const jobCount = async () => {
  const result = await prisma.job.count()
  return result
}

export async function getJob ( id ) {
  const job = await prisma.job.findUnique( { where: { id } } )
  if ( !job ) {
    return 'Job not Found'
  }
  return job
}

//function to get jobs by companyId

export async function getJobsByCompany ( id ) {
  const jobs = await prisma.job.findMany( {
    where: {
      companyId: id
    }
  } )
  if ( !jobs ) {
    return 'Jobs not Found'
  }
  return jobs
}

export async function createJob ( { companyId, title, description } ) {
  const job = await prisma.job.create( {
    data: {
      companyId,
      title,
      description
    }
  } );
  return job;
};

export async function deleteJob ( id, companyId ) {
  const job = await prisma.job.findUnique.where( { id, companyId } );
  if ( !job ) {
    throw new Error( `Job not found: ${id}` );
  }
  await prisma.job.delete( { where: { id } } );
  return job;
}

export async function updateJob ( { id, title, description }, companyId ) {
  const job = await prisma.job.findUnique( { where: { id, companyId } } );
  if ( !job ) {
    throw new Error( `Job not found: ${id} and ${companyId}` );
  }
  const updatedFields = { title, description };
  await prisma.job.update( { where: { id }, data: updatedFields } );
  return { ...job, ...updatedFields };
}
