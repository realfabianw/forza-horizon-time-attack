import { router, protectedProcedure } from "../trpc";
import { TelemetryCreateManySchema } from "../../../../prisma/generated/schemas/createManyTelemetry.schema";
import { TelemetryCreateManyInputObjectSchema } from "../../../../prisma/generated/schemas/objects/TelemetryCreateManyInput.schema";
import { TelemetryCreateManyEntryInputObjectSchema } from "../../../../prisma/generated/schemas/objects/TelemetryCreateManyEntryInput.schema";
import { z } from "zod";
import { Telemetry } from "@prisma/client";

export const telemetryRouter = router({
  createMany: protectedProcedure
    .input(TelemetryCreateManySchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.telemetry.createMany(input);
    }),
});
