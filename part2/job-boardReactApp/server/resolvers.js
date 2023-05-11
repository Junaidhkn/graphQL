export const resolvers = {
   Query: {
      job: () => {
         return {
            title: 'Software Engineer',
            company: 'Google',
            description: "Best job ever"
         }
      }
   }
}