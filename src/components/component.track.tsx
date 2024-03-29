import { Track } from "@prisma/client";
import Link from "next/link";
import CardComponent from "./component.card";

export default function TrackComponent(
  track: Track & { entries: { id: number }[] }
) {
  return CardComponent(
    <Link
      key={track.id}
      href={"/" + track.id}
      className=" flex h-full flex-col justify-between p-5"
    >
      <div className="flex flex-row">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold dark:text-white">
            {track.name}
          </h2>
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
      </div>
      {/* TODO Add count of entries to card */}
      {track.entries.length > 0 && (
        <div className="mx-auto -mb-4 font-mono dark:text-zinc-500">
          {track.entries.length == 1
            ? track.entries.length + " Entry"
            : track.entries.length + " Entries"}
        </div>
      )}
    </Link>
  );
}
