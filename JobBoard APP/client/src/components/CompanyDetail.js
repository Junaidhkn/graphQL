import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphQL/queries.js';
import JobList from './JobList.js';

function CompanyDetail () {
  const { companyId } = useParams();
  const [company, setCompany] = useState( null )

  useEffect( () => {
    getCompany( companyId ).then( company => setCompany( company ) )
  }, [companyId] )

  if ( !company ) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className='title is-5'>Jobs At {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
