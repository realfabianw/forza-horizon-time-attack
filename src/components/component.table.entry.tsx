import { Entry } from "@prisma/client";
import { createColumnHelper, RowSelection } from "@tanstack/react-table";
import Link from "next/link";
import { clearLine } from "readline";
import timeToReadable from "../utils/timeformat";
import { trpc } from "../utils/trpc";
import TableComponent from "./component.table";

export default function EntryTable(id: string) {
  const columnHelper = createColumnHelper<Entry & { user: { name: string } }>();
  const entries = trpc.entries.getByTrackId.useQuery(id);

  function header(input: string) {
    return <div className="flex text-xl dark:text-white">{input}</div>;
  }

  const columns = [
    columnHelper.display({
      id: "user",
      header: () => header("User"),
      cell: (props) => (
        <Link href={"/users/" + props.row.original.userId}>
          {props.row.original.user.name}
        </Link>
      ),
    }),
    columnHelper.accessor("manufacturer", {
      header: () => header("Car Manufacturer"),
    }),
    columnHelper.accessor("model", {
      header: () => header("Car Model"),
    }),
    columnHelper.accessor("year", {
      header: () => header("Car Year"),
    }),
    columnHelper.accessor("performancePoints", {
      header: () => header("Performance Points"),
    }),
    columnHelper.accessor((row) => timeToReadable(row.time), {
      id: "readableTime",
      header: () => header("Time"),
    }),
    columnHelper.accessor("shareCode", {
      header: () => header("Share Code"),
    }),
  ];

  return TableComponent({
    data: entries.data ? entries.data : [],
    columns: columns,
  });
}
