import { Entry } from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import timeToReadable from "../utils/timeformat";
import { trpc } from "../utils/trpc";

export default function EntryTable(id: string) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<Entry>();
  const entries = trpc.entries.getByTrackId.useQuery(id);

  function header(input: string) {
    return <div className="flex text-xl">{input}</div>;
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

  const table = useReactTable({
    data: entries.data ?? [],
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table
          .getRowModel()
          .rows.slice(0, 10)
          .map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
