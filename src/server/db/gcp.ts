import { Storage } from "@google-cloud/storage";
import { env } from "../../env/server.mjs";

const storage = new Storage({
  projectId: env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY,
  },
});

export const bucket = storage.bucket(env.GOOGLE_GCS_NAME as string);
