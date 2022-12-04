import { Track } from "@prisma/client";
import Link from "next/link";

export default function TrackComponent(track: Track) {
  return (
    <Link
      href={"/" + track.id}
      className="box-border flex h-full justify-between rounded border bg-white/10 p-5 shadow"
    >
      <div>
        <h2 className="text-xl font-semibold dark:text-white">{track.name}</h2>
        <div className="dark:text-white">
          {track.category} {track.length && "(" + track.length + " km)"}
        </div>
        <div className="dark:text-white">
          {track.shareCode && <div>{track.shareCode}</div>}
        </div>
      </div>

      <img
        src={"./" + track.category + " " + track.type + ".png"}
        alt={track.category + " " + track.type}
        className="h-auto w-12 object-contain"
      />
    </Link>
  );
}
