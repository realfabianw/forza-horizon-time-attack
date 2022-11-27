import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { tracksRouter } from "./tracks";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  tracks: tracksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;