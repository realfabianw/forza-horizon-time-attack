import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const tracksRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.track.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.track.findFirst({
      where: {
        id: input,
      },
    });
  }),
  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.track
      .findMany({
        distinct: ["category"],
        select: {
          category: true,
        },
      })
      .then((data) => {
        const result: string[] = [];
        data.forEach((queryResult) => result.push(queryResult.category));
        return result;
      });
  }),
});
