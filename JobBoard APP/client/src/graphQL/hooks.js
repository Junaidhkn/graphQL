import { useQuery } from "@apollo/client"
import { JOBS_QUERY } from "./queries.js"



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