import type { Car, Entry, Track } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import TableComponent from "../../../components/component.table";
import { trpc } from "../../../utils/trpc";
import { CameraIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import CardComponent from "../../../components/component.card";
import { useSession } from "next-auth/react";
import PerformanceIndex from "../../../components/component.performance.index";
import { formatTime } from "../../../utils/timeformat";
import DialogComponent from "../../../components/component.dialog";

const ProfilePage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const id = String(router.query.id);
  const user = trpc.users.readById.useQuery(id);

  // Delete Entry
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry]: any = useState(undefined);
  const deleteEntry = trpc.entries.deleteOne.useMutation();

  function handleDeleteEntry(entry: Entry & { track: Track; car: Car }) {
    const entryId: number = entry.id;

    console.log("Deleting entry: " + entryId);
    setIsOpen(false);

    deleteEntry.mutate(entryId);
    router.reload();
  }

  // Entries Table
  const columnHelper = createColumnHelper<Entry & { track: Track; car: Car }>();
  const columns = [
    columnHelper.accessor("track.name", {
      header: "Track",
      cell: (props) => (
        <Link href={"/" + props.row.original.trackId}>
          {props.row.original.track.name}
        </Link>
      ),
    }),
    columnHelper.group({
      header: "Car",
      columns: [
        columnHelper.accessor("car.make", {
          header: "Make",
        }),
        columnHelper.accessor("car.model", {
          header: "Model",
        }),
        columnHelper.accessor("car.year", {
          header: "Year",
        }),
      ],
    }),
    columnHelper.group({
      header: "Tune",
      columns: [
        columnHelper.accessor("performancePoints", {
          header: "Performance Points",
          cell: (props) =>
            PerformanceIndex(props.row.original.performancePoints),
        }),
        columnHelper.accessor("drivetrain", {
          header: "Drivetrain",
        }),
        columnHelper.accessor("buildType", {
          header: "Build Type",
        }),
        columnHelper.accessor("shareCode", {
          header: "Share Code",
        }),
      ],
    }),

    columnHelper.accessor((row) => formatTime(row.time), {
      id: "readableTime",
      header: "Time",
    }),
  ];

  if (user.data?.id == sessionData?.user?.id) {
    columns.push(
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (props) => (
          <div className="grid grid-cols-3 gap-1">
            {CardComponent(
              <button
                className="mx-auto h-full w-full"
                onClick={() =>
                  router.push("/entries/" + props.row.original.id + "/edit")
                }
              >
                <PencilIcon className="mx-auto h-6" />
              </button>
            )}
            {CardComponent(
              <button
                className="mx-auto h-full w-full"
                onClick={() => router.push(props.row.original.screenshotUrl)}
              >
                <CameraIcon className="mx-auto h-6" />
              </button>
            )}
            {CardComponent(
              <button
                className="mx-auto h-full w-full"
                onClick={() => {
                  setSelectedEntry(props.row.original);
                  setIsOpen(true);
                }}
              >
                <TrashIcon className="mx-auto h-6" />
              </button>
            )}
          </div>
        ),
      })
    );
  } else {
    columns.push(
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (props) => (
          <div className="grid grid-cols-1 gap-1">
            {CardComponent(
              <button
                className="mx-auto h-full w-full"
                onClick={() => router.push(props.row.original.screenshotUrl)}
              >
                <CameraIcon className="mx-auto h-6" />
              </button>
            )}
          </div>
        ),
      })
    );
  }

  return (
    <div className="container mx-auto flex flex-col justify-items-center">
      {DialogComponent(
        isOpen,
        setIsOpen,
        "Delete Entry",
        <div>
          <div className="dark:text-white">
            Are you sure you want to delete this entry?
          </div>
          <div className="grid grid-cols-2 gap-1 pt-5">
            <button
              className="rounded bg-red-600 dark:text-white"
              onClick={() => handleDeleteEntry(selectedEntry)}
            >
              Delete
            </button>
            <button
              className="rounded bg-zinc-700 dark:text-white"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto pb-10">
        <img
          src={user.data?.image ?? ""}
          className="mx-auto w-40 rounded-full"
        />
        <h1 className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          {user.data?.name ?? ""}
        </h1>
      </div>
      {TableComponent({
        data: user.data ? user.data.entries : [],
        columns: columns,
      })}
    </div>
  );
};

export default ProfilePage;
