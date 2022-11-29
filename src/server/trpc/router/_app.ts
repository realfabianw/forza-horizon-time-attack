import { router } from "../trpc";
import { authRouter } from "./auth";
import { entriesRouter } from "./entries";
import { exampleRouter } from "./example";
import { tracksRouter } from "./tracks";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  tracks: tracksRouter,
  entries: entriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
