import { prisma } from "./seed.js";

export const resolvers = {
   Query: {
      jobs: async () => {
         return await prisma.job.findMany();
      }
   }
}