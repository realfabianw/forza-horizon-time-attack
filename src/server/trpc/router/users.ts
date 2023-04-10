import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const usersRouter = router({
  readById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
      include: {
        entries: {
          include: {
            track: true,
            car: true,
          },
        },
      },
    });
  }),
});
