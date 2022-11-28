import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const entriesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany();
  }),

  insert: protectedProcedure.query(({ ctx, input }) => {
    return ctx.prisma.entry.create(input);
  }),
});
