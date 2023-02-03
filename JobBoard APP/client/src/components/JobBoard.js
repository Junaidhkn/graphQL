import JobList from './JobList';
import { JOBS_QUERY } from '../graphQL/queries.js';
import { useQuery } from '@apollo/client';


function JobBoard () {


  //  const JOBS_QUERY = gql`
  //    query JobsQuery{
  //   jobs {
  //     id
  //     title
  //     description
  //     company {
  //       id
  //       name
  //     }
  //   }
  // }

  // `

  const { data, loading, error } = useQuery( JOBS_QUERY, {
    fetchPolicy: 'network-only'
  } )

  if ( loading ) {
    return <p>Loading..</p>
  }

  if ( error ) {
    return <p>Something Went Wrong!</p>
  }


  const { jobs } = data




  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
