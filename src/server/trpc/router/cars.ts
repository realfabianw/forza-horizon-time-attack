import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const carsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.car.findMany({});
  }),
});
