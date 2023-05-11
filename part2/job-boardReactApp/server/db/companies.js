export const getCompanies = () => { };

export async function getCompany ( id ) {
  return await getCompanyTable().first().where( { id } );
}
