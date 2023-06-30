import { useState } from 'react';
import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks.js';

function HomePage () {
  const [currentPage, setCurrrentPage] = useState( 1 )

  const limit = 5
  const offset = ( currentPage - 1 ) * limit
  const { jobs, loading, error } = useJobs( limit, offset )

  if ( loading ) {
    return <div>Loading...</div>
  }

  if ( error ) {
    return <div className='has-text-danger'>Data requested is unavailable!!!!</div>
  }

  const nextPage = () => {
    setCurrrentPage( currentPage + 1 )
  }
  const previousPage = () => {
    if ( currentPage <= 1 ) {
      return
    }
    setCurrrentPage( currentPage - 1 )
  }

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs.jobItems} />

      <div>
        <button className="button is-primary" onClick={previousPage}>Load Less</button>
        <span>{currentPage}</span>
        <button className="button is-primary" onClick={nextPage}>Load More</button>
      </div>
    </div>
  );
}

export default HomePage;
