const element = document.getElementById( 'greet' )
const GRAPHQL_URL = 'http://localhost:9000/'



async function fetchGreet () {
   const res = await fetch( GRAPHQL_URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
         query: `
         query {
                greetings
               }
         `
      } )
   } )

   const { data } = await res.json()
   return data
}



element.textContent = 'Loading...'

fetchGreet().then( ( data ) => {
   element.textContent = data.greetings
} )


