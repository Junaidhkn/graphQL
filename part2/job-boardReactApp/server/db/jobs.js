import { prisma } from "../seed.js";


export async function getJobs () {
  return await prisma.job.findMany();
}

export async function getJob ( id ) {
  return await prisma.job.findUnique( { where: { id } } );
}

const jobData = [
  {
    id: 'f3YzmnBZpK0o',
    companyId: 'FjcJCHJALA4i',
    title: 'Frontend Developer',
    description: 'We are looking for a Frontend Developer familiar with React.',
    createdAt: '2023-01-26T11:00:00.000Z',
  },
  {
    id: 'XYZNJMXFax6n',
    companyId: 'FjcJCHJALA4i',
    title: 'Backend Developer',
    description: 'We are looking for a Backend Developer familiar with Node.js and Express.',
    createdAt: '2023-05-27T11:00:00.000Z',
  },
  {
    id: '6mA05AZxvS1R',
    companyId: 'Gu7QW9LcnF5d',
    title: 'Full-Stack Developer',
    description: 'We are looking for a Full-Stack Developer familiar with Node.js, Express, and React.',
    createdAt: '2023-04-30T11:00:00.000Z',
  }
];

console.log( jobData );
export async function createJob () {
  for ( const k of jobData ) {
    const job = await prisma.job.create( {
      data: k,
    } );
    console.log( job );
  }
};
createJob();

export async function deleteJob ( id ) {
  const job = await getJobTable().first().where( { id } );
  if ( !job ) {
    throw new Error( `Job not found: ${id}` );
  }
  await getJobTable().delete().where( { id } );
  return job;
}

export async function updateJob ( { id, title, description } ) {
  const job = await getJobTable().first().where( { id } );
  if ( !job ) {
    throw new Error( `Job not found: ${id}` );
  }
  const updatedFields = { title, description };
  await getJobTable().update( updatedFields ).where( { id } );
  return { ...job, ...updatedFields };
}
