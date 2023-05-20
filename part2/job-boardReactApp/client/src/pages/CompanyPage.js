import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries.js';

function CompanyPage () {
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  useEffect( () => {
    getCompany( companyId ).then( companyById => { setCompany( companyById ) } )
  }, [companyId, setCompany] )

  if ( !company ) return <h1>Loading...</h1>

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
    </div>
  );
}

export default CompanyPage;
