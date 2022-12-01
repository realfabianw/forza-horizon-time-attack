import { Track } from "@prisma/client";
import Link from "next/link";

export default function TrackComponent(track: Track) {
  return (
    <Link
      href={"/tracks/" + track.id}
      className="box-border flex h-full justify-between rounded border bg-white/10 p-5 shadow"
    >
      <div>
        <h2 className="text-xl font-semibold">{track.name}</h2>
        <div>
          {track.category} {track.length && "(" + track.length + " km)"}
        </div>
        {track.shareCode && <div>{track.shareCode}</div>}
      </div>

      <img
        src={"./" + track.category + " " + track.type + ".png"}
        alt={track.category + " " + track.type}
        className="h-auto w-12 object-contain"
      />
    </Link>
  );
}
