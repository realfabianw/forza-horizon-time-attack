import { TelemetryCreateManySchema } from "../../../../prisma/generated/schemas/createManyTelemetry.schema";
import { router, protectedProcedure } from "../trpc";

export const telemetryRouter = router({
  createMany: protectedProcedure
    .input(TelemetryCreateManySchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.telemetry.createMany(input);
    }),
});
