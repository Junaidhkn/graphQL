import { request, gql } from 'graphql-request'

const GRAPHQL_URL = 'http://localhost:9000/'

export const getJobs = async () => {

   const query = gql`
   query {
  jobs {
    id
    title
    description
    company {
      id
    }
  }
}

`
   const data = await request( GRAPHQL_URL, query )
   console.log( data );


}