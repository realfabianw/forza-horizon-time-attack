import { Entry } from "@prisma/client";
import { createColumnHelper, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import TableComponent from "../../../components/component.table";
import { trpc } from "../../../utils/trpc";
import { TrashIcon } from "@heroicons/react/24/outline";
import CardComponent from "../../../components/component.card";
import formatTime from "../../../utils/timeformat";

const ProfilePage = () => {
  const router = useRouter();
  const id: string = router.query.id as string;
  const user = trpc.users.getById.useQuery(id);
  const entries = trpc.entries.getAllFromUser.useQuery(id);
  const deleteEntry = trpc.entries.delete.useMutation();

  const columnHelper = createColumnHelper<
    Entry & { track: { name: string } }
  >();

  function header(input: string) {
    return <div className="flex text-xl dark:text-white">{input}</div>;
  }

  function handleDelete(row: Row<Entry & { track: { name: string } }>) {
    const entryId: string = row.original.id;
    deleteEntry.mutate(entryId);
    // TODO refresh page
  }

  const columns = [
    columnHelper.accessor("track.name", {
      header: () => header("Track"),
      cell: (props) => (
        <Link href={"/" + props.row.original.trackId}>
          {props.row.original.track.name}
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
    columnHelper.accessor((row) => formatTime(row.time), {
      id: "readableTime",
      header: () => header("Time"),
    }),
    columnHelper.accessor("shareCode", {
      header: () => header("Share Code"),
    }),
    columnHelper.display({
      id: "actions",
      header: () => header("Actions"),
      cell: (props) =>
        CardComponent(
          <button
            className="mx-auto h-full w-full"
            onClick={() => handleDelete(props.row)}
          >
            <TrashIcon className="mx-auto h-6" />
          </button>
        ),
    }),
  ];

  return (
    <div className="container mx-auto flex flex-col justify-items-center">
      <div className="mx-auto pb-10">
        <img src={user.data?.image ?? ""} className="mx-auto rounded-full" />
        <h1 className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          {user.data?.name ?? ""}
        </h1>
      </div>
      {TableComponent({
        data: entries.data ? entries.data : [],
        columns: columns,
      })}
    </div>
  );
};

export default ProfilePage;
