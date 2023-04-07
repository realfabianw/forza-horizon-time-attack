import { z } from "zod";
import { EntryCreateOneSchema } from "../../../../prisma/generated/schemas/createOneEntry.schema";
import { EntryUpdateInputObjectSchema } from "../../../../prisma/generated/schemas/objects/EntryUpdateInput.schema";
import {
  Likelihood,
  bucket,
  getLikelihoodValue,
  imageAnnotatorClient,
} from "../../db/gcp";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const entriesRouter = router({
  update: publicProcedure
    .input(z.object({ id: z.number(), entry: EntryUpdateInputObjectSchema }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.entry.update({
        where: {
          id: input.id,
        },
        data: input.entry,
      });
    }),

  /**
   * Provides a presigned URL to upload a local file to the Google Cloud Storage.
   * Users need to upload screenshots of their entries to validate them.
   * Currently only supports JPEG.
   *
   * Input: Takes the images file name
   */
  generatePresignedURL: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const url = await bucket
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
  /**
   * Performs a SafeSearchAnnotation analysis on a provided picture.
   * Input: URL to picture
   */
  analyseImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const [result] = await imageAnnotatorClient.safeSearchDetection(input);
      const detections = result.safeSearchAnnotation;

      let appropriate = false;

      if (
        getLikelihoodValue(detections?.adult?.toString()) >=
          Likelihood.POSSIBLE ||
        getLikelihoodValue(detections?.medical?.toString()) >=
          Likelihood.POSSIBLE ||
        getLikelihoodValue(detections?.spoof?.toString()) >=
          Likelihood.POSSIBLE ||
        getLikelihoodValue(detections?.violence?.toString()) >=
          Likelihood.POSSIBLE ||
        getLikelihoodValue(detections?.racy?.toString()) >= Likelihood.POSSIBLE
      ) {
        // SafeSearch Image Annotation deemed the image to be inappropriate
        // TODO Rename the image or instantly remove it?
      } else {
        appropriate = true;
      }

      return {
        safeSearch: {
          isAppropriate: appropriate,
          adult: detections?.adult,
          medical: detections?.medical,
          spoof: detections?.spoof,
          violence: detections?.violence,
          racy: detections?.racy,
        },
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany();
  }),
  getLast: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.entry.findMany({
      orderBy: {
        timestamp: "desc",
      },
      take: input,
      include: {
        car: {
          select: {
            make: true,
            model: true,
            year: true,
          },
        },
        track: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }),
  getByEntryId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.entry.findUnique({
      where: {
        id: input,
      },
    });
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
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      // Get Entry to delete

      const entry = await ctx.prisma.entry.findUnique({
        where: {
          id: input,
        },
      });

      if (entry) {
        const screenshotFileName = String(
          "screenshots/" + entry?.screenshotUrl.split("/").slice(-1)
        );

        if (entry?.userId == ctx.session.user.id) {
          // Delete the screenshot on gcs
          bucket
            .file(screenshotFileName)
            .delete()
            .catch((err) => console.log(err));

          // Delete the entry in the database
          return ctx.prisma.entry.deleteMany({
            where: {
              id: input,
              userId: ctx.session.user.id,
            },
          });
        }
      }
    }),
  /**
   * Deletes a image from the Google Cloud Storage.
   * Input: Public Image URL
   */
  deleteImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const screenshotFileName = String(
        "screenshots/" + input.split("/").slice(-1)
      );

      bucket
        .file(screenshotFileName)
        .delete()
        .catch((err) => console.log(err));
    }),
});
