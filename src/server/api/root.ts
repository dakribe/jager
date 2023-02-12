import { createTRPCRouter } from './trpc';
import { jobApplicationRouter } from './routers/jobApplication';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  jobApplication: jobApplicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
