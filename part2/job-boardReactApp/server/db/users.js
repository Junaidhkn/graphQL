export const getUsers = () => {
};

export async function getUser ( id ) {
  return await getUserTable().first().where( { id } );
}

export async function getUserByEmail ( email ) {
  return await getUserTable().first().where( { email } );
}
