import { z } from "zod";
import { EntryCreateOneSchema } from "../../../../prisma/generated/schemas/createOneEntry.schema";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const entriesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany();
  }),

  getByTrackId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.entry.findMany({
      where: {
        trackId: input,
      },
    });
  }),

  insert: protectedProcedure
    .input(EntryCreateOneSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.entry.create(input);
    }),
});