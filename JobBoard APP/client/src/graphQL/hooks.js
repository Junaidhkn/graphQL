import { useQuery } from "@apollo/client"
import { JOBS_QUERY } from "./queries.js"


// Just For Query Reference

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

export const useJobs = () => {
   const { data, loading, error } = useQuery( JOBS_QUERY, {
      fetchPolicy: 'network-only'
   } )
   return {
      jobs: data?.jobs,
      loading,
      error: Boolean( error )
   }

}