import mongo from "../../lib/mongo";
import Track from "../../models/track";

export default async function TracksPage() {
  await mongo();

  // TODO add fetch
  const tracks = Track.find();
  return (
    <div>
      <h1>Tracks list</h1>
    </div>
  );
}
