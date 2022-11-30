import { Entry } from "@prisma/client";
import Link from "next/link";

export default function EntryComponent(entry: Entry) {
  return (
    <div className="box-border flex h-full justify-between rounded border bg-white/10 p-5 shadow">
      <div>{entry.manufacturer}</div>
      <div>{entry.model}</div>
      <div>{entry.time}</div>
    </div>
  );
}
