import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const tracksRouter = router({
  readAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.track.findMany({
      /**
       * TODO Change this to include a count of entries
       * https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing#filter-the-relation-count
       * The docs dont work for me. MongoDB problem?
       */
      include: {
        entries: {
          select: {
            id: true,
          },
        },
      },
    });
  }),

  readFirstById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.track.findFirst({
      where: {
        id: input,
      },
      include: {
        entries: {
          include: {
            car: true,
            user: true,
          },
        },
      },
    });
  }),

  /**
   * Returns all distinct categories found in the tracks table.
   */
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
        const eventLabCategory = result.pop();
        return {
          eventlab: eventLabCategory,
          remaingingCategories: result,
        };
      });
  }),
});
