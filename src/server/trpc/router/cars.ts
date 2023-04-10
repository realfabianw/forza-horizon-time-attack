import { router, publicProcedure } from "../trpc";

export const carsRouter = router({
  readAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.car.findMany({});
  }),
});
