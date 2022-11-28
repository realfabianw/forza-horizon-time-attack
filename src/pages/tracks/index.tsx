import { Track } from "@prisma/client";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

interface CategoryFilter {
  category: String;
  active: boolean;
}

function buildFilter(categories: String[] | undefined) {
  if (!categories) {
    return [];
  }
  let filter: CategoryFilter[] = [];
  categories.forEach((cat) => {
    filter.push({ category: cat, active: false });
  });
  return filter;
}

export default function TracksPage() {
  // await mongo();

  const filters: CategoryFilter[] = buildFilter(
    trpc.tracks.getAllCategories.useQuery().data!
  );

  const tracks = trpc.tracks.getAll.useQuery();

  return (
    <div>
      <h1>Tracks list</h1>
      {filters &&
        filters.map((filter, index) => (
          <button key={index} className="rounded bg-white/10 px-10 py-3">
            {filter.category}
          </button>
        ))}
      <div>Can't find your track? Add a new one...</div>
      <div className="flex flex-wrap">
        {tracks.data &&
          tracks.data.map((track, index) => (
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
