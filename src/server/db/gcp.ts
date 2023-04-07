import { Storage } from "@google-cloud/storage";
import { env } from "../../env/server.mjs";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const storage = new Storage({
  projectId: env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY,
  },
});

/**
 * Replicates the Likelihood enum used from Vision API
 */
export const Likelihood = {
  UNKNOWN: 0,
  VERY_UNLIKELY: 1,
  UNLIKELY: 2,
  POSSIBLE: 3,
  LIKELY: 4,
  VERY_LIKELY: 5,
};

export function getLikelihoodValue(str: string | undefined) {
  switch (str) {
    case "UNKNOWN":
      return Likelihood.UNKNOWN;
    case "VERY_UNLIKELY":
      return Likelihood.VERY_UNLIKELY;
    case "UNLIKELY":
      return Likelihood.UNLIKELY;
    case "POSSIBLE":
      return Likelihood.POSSIBLE;
    case "LIKELY":
      return Likelihood.LIKELY;
    case "VERY_LIKELY":
      return Likelihood.VERY_LIKELY;
    default:
      return 999; // oder werfen Sie eine Fehlermeldung, wenn der String nicht erkannt wird
  }
}

export const imageAnnotatorClient = new ImageAnnotatorClient({
  projectId: env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY,
  },
});

export const bucket = storage.bucket(env.GOOGLE_GCS_NAME as string);
