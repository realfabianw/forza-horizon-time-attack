import { router } from "../trpc";
import { authRouter } from "./auth";
import { carsRouter } from "./cars";
import { entriesRouter } from "./entries";
import { telemetryRouter } from "./telemetry";
import { tracksRouter } from "./tracks";
import { usersRouter } from "./users";

export const appRouter = router({
  auth: authRouter,
  users: usersRouter,
  tracks: tracksRouter,
  entries: entriesRouter,
  telemetry: telemetryRouter,
  cars: carsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
