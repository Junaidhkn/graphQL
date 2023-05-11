export const resolvers = {
   Query: {
      jobs: () => {
         return [
            {
               id: '1',
               title: 'Software Engineer',
               company: 'Google',
               description: "Best job ever"
            }
         ]
      }
   }
}