import { request } from 'graphql-request'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth.js'

const GRAPHQL_URL = 'http://localhost:9000/'

export const client = new ApolloClient( {
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'network-only'
  //   },
  //   mutate: {
  //     fetchPolicy: 'network-only'
  //   },
  //   watchQuery: {
  //     fetchPolicy: 'network-only'
  //   }
  // }
} )


export const JOBS_QUERY = gql`
   query JobsQuery{
  jobs {
    id
    title
    description
    company {
      id
      name
    }
  }
}

`

// export const getJobs = async () => {

//   const query = gql`
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
//   const { data: { jobs } } = await client.query( { query, fetchPolicy: 'network-only' } )

//   // const { jobs } = await request( GRAPHQL_URL, query )

//   return jobs

// }




export const getJob = async ( id ) => {

  const query = gql`
query JobQuery($id:ID!){
  job(id:$id ) {
    id
    title
    description
    company {
      id
      name
    }
  }
}

`
  const variables = { id }
  const { data: { job } } = await client.query( { query, variables } )

  // const { job } = await request( GRAPHQL_URL, query, variables )
  return job

}



export const getCompany = async ( id ) => {

  const query = gql`
query CompanyQuery($id:ID!){
  company(id:$id ) {
    name
    description
    jobs{
      id
      title
    }
  }
  }

`
  const variables = { id }
  const { data: { company } } = await client.query( { query, variables } )
  // const { company } = await request( GRAPHQL_URL, query, variables )
  return company

}

const JOB_DETAIL_FRAGENT = gql`
fragment JobDetail on Job{
  id
    title
    description
    company {
      id
      name
    }
}
`

export const createJob = async ( input ) => {

  const mutation = gql`
mutation CreateJobMutation($input:CreateJobInput!){
  job:createJob(input:$input) {
    ...JobDetail
  }
}
${JOB_DETAIL_FRAGENT}

`
  const variables = { input }
  const headers = { 'Authorization': 'Bearer ' + getAccessToken() }

  const context = {
    headers
  }

  const { data: { job } } = await client.mutate( {
    mutation,
    variables,
    context,
    update: ( cache, { data: { job } } ) => {
      cache.writeQuery( {
        query: job,
        variables: { id: job.id },
        data: { job }
      } )
    }
  } )

  // const { job } = await request( GRAPHQL_URL, mutation, variables, headers )
  return job

}
