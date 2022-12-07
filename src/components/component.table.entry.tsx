import { Entry } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import timeToReadable from "../utils/timeformat";
import { trpc } from "../utils/trpc";
import TableComponent from "./component.table";

export default function EntryTable(id: string) {
  const columnHelper = createColumnHelper<Entry>();
  const entries = trpc.entries.getByTrackId.useQuery(id);

  function header(input: string) {
    return <div className="flex text-xl dark:text-white">{input}</div>;
  }

  const columns = [
    //TODO Accessor Function to retrieve username from userId
    columnHelper.accessor("userId", {
      header: () => header("User"),
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
