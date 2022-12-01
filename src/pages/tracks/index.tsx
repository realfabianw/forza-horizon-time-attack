import Link from "next/link";
import { trpc } from "../../utils/trpc";
import TrackComponent from "../../components/component.track";

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
    <div className="container mx-auto">
      <h1>Tracks list</h1>
      {filters &&
        filters.map((filter, index) => (
          <button key={index} className="rounded bg-white/10 px-10 py-3">
            {filter.category}
          </button>
        ))}
      <div>Can't find your track? Add a new one...</div>
      <div className="grid grid-cols-3 gap-3">
        {tracks.data &&
          tracks.data.map((track, index) => TrackComponent(track))}
      </div>
    </div>
  );
}
