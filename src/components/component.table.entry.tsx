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

  const columns = [
    //TODO Accessor Function to retrieve username from userId
    columnHelper.accessor("userId", {
      header: () => <div>User</div>,
    }),
    columnHelper.accessor("manufacturer", {
      header: () => <div>Car Manufacturer</div>,
    }),
    columnHelper.accessor("model", {
      header: () => <div>Car Model</div>,
    }),
    columnHelper.accessor("year", {
      header: () => <div>Car Year</div>,
    }),
    columnHelper.accessor("performancePoints", {
      header: () => <div>Performance Points</div>,
    }),
    columnHelper.accessor((row) => timeToReadable(row.time), {
      id: "readableTime",
      header: () => <div>Time</div>,
    }),
    columnHelper.accessor("shareCode", {
      header: () => <div>Share Code</div>,
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
    <table>
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
