import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const userData = [
	{

	}
];
const companyData = [
	{

	}
];
const jobData = [
	{

	}
];

async function main () {
	for ( const i of userData ) {
		const user = await prisma.user.create( {
			data: i,
		} );
	}
	for ( const j of companyData ) {
		const company = await prisma.comapany.create( {
			data: j,
		} );
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
