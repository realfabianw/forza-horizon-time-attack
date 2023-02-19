import { Storage } from "@google-cloud/storage";
import { z } from "zod";
import { EntryCreateOneSchema } from "../../../../prisma/generated/schemas/createOneEntry.schema";

import { router, publicProcedure, protectedProcedure } from "../trpc";

const storage = new Storage({
  projectId: "forza-horizon-time-attack",
  keyFilename: "forza-horizon-time-attack-4fa3a1275e85.json",
});

const bucket = storage.bucket("fhta-gcs");

export const entriesRouter = router({
  uploadImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      let url = await bucket
        .file("screenshots/" + ctx.session.user.id + "_" + input)
        .getSignedUrl({
          version: "v4",
          action: "write",
          expires: Date.now() + 60 * 1000, // 1 minute
          contentType: "image/jpeg",
        });

      return {
        signedUrl: url[0],
        publicUrl:
          "https://storage.googleapis.com/fhta-gcs/screenshots/" +
          ctx.session.user.id +
          "_" +
          input,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany();
  }),
  getByTrackId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.entry.findMany({
      where: {
        trackId: input,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  insert: protectedProcedure
    .input(EntryCreateOneSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.entry.create(input);
    }),
  getAllFromUser: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.entry.findMany({
      where: {
        userId: input,
      },
      include: {
        track: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.entry.deleteMany({
      where: {
        id: input,
        userId: ctx.session.user.id,
      },
    });
  }),
});
