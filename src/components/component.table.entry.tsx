import { Entry } from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import timeToReadable from "../utils/timeformat";
import { trpc } from "../utils/trpc";

export default function EntryTable(id: string) {
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
