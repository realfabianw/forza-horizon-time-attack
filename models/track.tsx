import mongoose, { Schema } from "mongoose";

interface ITrack {
  name: String;
  type: String;
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

export default mongoose.models.Pet || mongoose.model("Pet", trackSchema);
