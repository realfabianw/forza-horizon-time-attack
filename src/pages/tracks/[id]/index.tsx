import { useRouter } from "next/router";

export default function TrackPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <div>{id}</div>
    </div>
  );
}
