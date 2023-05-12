import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
	{
		id: 'AcMJpL7b413Z',
		companyId: 'FjcJCHJALA4i',
		email: 'alice@facegle.io',
		password: 'alice123',
	},
	{
		id: 'BvBNW636Z89L',
		companyId: 'Gu7QW9LcnF5d',
		email: 'bob@goobook.co',
		password: 'bob123',
	}
];
const companyData = [
	{
		id: 'FjcJCHJALA4i',
		name: 'Facegle',
		description: 'We are a startup on a mission to disrupt social search engines. Think Facebook meet Google.',
	},
	{
		id: 'Gu7QW9LcnF5d',
		name: 'Goobook',
		description: 'We are a startup on a mission to disrupt search social media. Think Google meet Facebook.',
	}
];
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

async function main () {
	for ( const i of userData ) {
		const user = await prisma.user.create( {
			data: i,
		} );
		return user
	}
	for ( const j of companyData ) {
		const company = await prisma.company.create( {
			data: j,
		} );
		return company
	}
	for ( const k of jobData ) {
		const job = await prisma.job.create( {
			data: k,
		} );
	}
}

main()
	.then( async () => {
		await prisma.$disconnect();
	} )
	.catch( async ( e ) => {
		console.error( e );
		await prisma.$disconnect();
		process.exit( 1 );
	} );
