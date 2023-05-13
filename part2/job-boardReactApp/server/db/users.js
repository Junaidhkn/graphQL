import { prisma } from "../seed.js";

export const getUsers = async () => {
  return await prisma.user.findMany()
};

export const createUser = async ( data ) => {
  const user = await prisma.user.create( {
    data: data
  } )
}

export async function getUser ( id ) {
  return await prisma.user.findUnique( { where: { id } } );
}

export async function getUserByEmail ( email ) {
  return await prisma.user.findUnique( { where: { email } } );
}
