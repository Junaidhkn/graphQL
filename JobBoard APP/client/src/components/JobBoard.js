import JobList from './JobList';
import { getJobs } from '../graphQL/queries.js';



getJobs()
function JobBoard () {
  const jobs = []
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
