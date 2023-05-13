import { prisma } from "../seed.js";

export const getCompanies = async () => {
  return await prisma.company.findMany()
};

export async function getCompany ( id ) {
  return await prisma.company.findUnique( { where: { id } } );
}
