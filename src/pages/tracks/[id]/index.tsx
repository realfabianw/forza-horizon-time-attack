import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

export default function TrackPage() {
  const router = useRouter();
  console.log(router);
  const id: string = String(router.query.id);

  const track = trpc.tracks.getById.useQuery({ id: id });

  return (
    <div>
      <div>{id}</div>
      <div>{track.data && track.data.name}</div>
    </div>
  );
}
