import { router } from "../trpc";
import { authRouter } from "./auth";
import { entriesRouter } from "./entries";
import { tracksRouter } from "./tracks";

export const appRouter = router({
  auth: authRouter,
  tracks: tracksRouter,
  entries: entriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
