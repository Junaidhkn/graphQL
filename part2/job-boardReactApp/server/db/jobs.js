import { prisma } from "../seed.js";


export async function getJobs () {
  return await prisma.job.findMany();
}

export async function getJob ( id ) {
  return await prisma.job.findUnique( { where: { id } } );
}


export async function createJob ( { campanyId, title, description } ) {
  return await prisma.job.create( {
    data: {
      campanyId,
      title,
      description
    }
  } );
};

export async function deleteJob ( id ) {
  const job = await prisma.job.findUnique.where( { id } );
  if ( !job ) {
    throw new Error( `Job not found: ${id}` );
  }
  await prisma.job.delete( { where: { id } } );
  return job;
}

export async function updateJob ( { id, title, description } ) {
  const job = await prisma.job.findUnique.where( { id } );
  if ( !job ) {
    throw new Error( `Job not found: ${id}` );
  }
  const updatedFields = { title, description };
  await prisma.job.update( { where: { id }, data: updatedFields } );
  return { ...job, ...updatedFields };
}
