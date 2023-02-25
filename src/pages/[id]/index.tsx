import type { Car, Entry, User } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/router";
import CardComponent from "../../components/component.card";
import PerformanceIndex from "../../components/component.performance.index";
import { trpc } from "../../utils/trpc";
import TableComponent from "../../components/component.table";
import { signIn, useSession } from "next-auth/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { formatTime } from "../../utils/timeformat";

export default function TrackPage() {
  const router = useRouter();
  const id = Number(router.query.id);

  const { data: sessionData } = useSession();

  const track = trpc.tracks.getByIdIncludeRelations.useQuery(id);

  const columnHelper = createColumnHelper<Entry & { user: User; car: Car }>();

  const columns = [
    columnHelper.display({
      id: "user.id",
      header: "User",
      cell: (props) => (
        <Link href={"/users/" + props.row.original.userId}>
          {props.row.original.user.name}
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
    columnHelper.display({
      id: "actions",
      header: "Verification",
      cell: (props) =>
        CardComponent(
          <button
            className="mx-auto h-full w-full"
            onClick={() => router.push(props.row.original.screenshotUrl)}
          >
            <CameraIcon className="mx-auto h-6" />
          </button>
        ),
    }),
  ];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        {track.data && (
          <div className="flex flex-row pb-10">
            <div>
              <img
                src={"/" + track.data.category + " " + track.data.type + ".png"}
                alt={track.data.category + " " + track.data.type}
                className="mx-auto h-full w-12 self-baseline object-contain"
              />
            </div>
            <div className="basis-2/3">
              <div className="flex flex-col">
                <div className="mx-auto text-xl font-semibold dark:text-white">
                  {track.data.name}
                </div>
                <div className="mx-auto dark:text-white">
                  {track.data.category} - {track.data.type}{" "}
                  {track.data.length && "(" + track.data.length + " km)"}
                </div>
                {track.data.shareCode && (
                  <div className="mx-auto dark:text-white">
                    Sharecode: {track.data.shareCode}
                  </div>
                )}
              </div>
            </div>
            <div className="basis-1/3">
              {CardComponent(
                <button
                  type="button"
                  onClick={() =>
                    sessionData
                      ? router.push("/" + id + "/add-entry")
                      : signIn()
                  }
                  className="h-full w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:text-white"
                >
                  Add Time
                </button>
              )}
            </div>
          </div>
        )}

        <div>
          {TableComponent({
            data: track.data ? track.data.entries : [],
            columns: columns,
          })}
        </div>
      </div>
    </div>
  );
}
