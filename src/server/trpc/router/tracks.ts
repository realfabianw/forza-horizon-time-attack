import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const tracksRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.track.findMany();
  }),
});
