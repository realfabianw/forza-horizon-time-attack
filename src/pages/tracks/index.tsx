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
            <Link
              key={index}
              href={"/tracks/" + track.id}
              className="rounded border bg-white/10 p-5"
            >
              <div>{track.name}</div>
              <div>{track.category}</div>
              {track.length && <div>{track.length} km</div>}

              <img
                src={"./" + track.category + " " + track.type + ".png"}
                alt={track.category + " " + track.type}
                className="h-auto w-12 object-contain"
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
