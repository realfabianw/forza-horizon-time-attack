import mongoose, { Schema } from "mongoose";

export interface ITrack {
  id: String;
  name: String;
  category: String;
  type: String;
  length: number;
  share_code: String;
}

const trackSchema = new Schema<ITrack>({
  name: {
    type: String,
    required: [true, "Please provide a name for this track"],
  },
  type: {
    type: String,
    required: [true, "Please provide a type for this track"],
  },
});

export default mongoose.models.Pet || mongoose.model("Track", trackSchema);
