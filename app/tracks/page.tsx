import Link from "next/link";
import mongo from "../../lib/mongo";
import Track, { ITrack } from "../../models/track";

export default function TracksPage() {
  // await mongo();

  const filters = [
    {
      name: "All",
    },
    {
      name: "Road Racing",
    },
    {
      name: "Road Sprint",
    },
    {
      name: "Event Lab",
    },
  ];

  // TODO add fetch
  //const tracks = Track.find();

  const tracks: ITrack[] = [
    {
      id: "1",
      name: "Track 1",
      category: "Category 1",
      type: "Road Racing",
      length: 6.9,
      share_code: "123123123",
    },
    {
      id: "2",
      name: "Track 2",
      category: "Category 1",
      type: "Road Racing",
      length: 6.9,
      share_code: "123123123",
    },
    {
      id: "3",
      name: "Track 3",
      category: "Category 1",
      type: "Road Racing",
      length: 6.9,
      share_code: "123123123",
    },
  ];

  return (
    <div>
      {/* <h1>Tracks list</h1>
      {filters &&
        filters.map((filter, index) => (
          <button key={index} className="rounded bg-white/10 px-10 py-3">
            {filter.name}
          </button>
        ))}
      <div>Can't find your track? Add a new one...</div> */}
      <div className="flex flex-wrap">
        {tracks &&
          tracks.map((track, index) => (
            <div key={index} className="rounded border bg-white/10 p-5">
              <Link href={"/tracks/" + track.id}>
                <div>{track.name}</div>
                <div>{track.category}</div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
