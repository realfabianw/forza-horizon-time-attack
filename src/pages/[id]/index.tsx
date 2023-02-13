import { Dialog, Transition } from "@headlessui/react";
import { Car, Entry, User } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { HashLoader } from "react-spinners";
import { EntryCreateOneSchema } from "../../../prisma/generated/schemas/createOneEntry.schema";
import CardComponent from "../../components/component.card";
import PerformanceIndex from "../../components/component.performance.index";
import formatTime from "../../utils/timeformat";
import { trpc } from "../../utils/trpc";
import TableComponent from "../../components/component.table";

export default function TrackPage() {
  const router = useRouter();
  const id: number = Number(router.query.id);

  const track = trpc.tracks.getByIdIncludeRelations.useQuery(id);

  const { data: sessionData } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleAddEntryForm(e: any) {
    e.preventDefault();

    const entry = {
      track: {
        connect: {
          id: id,
        },
      },
      user: {
        connect: {
          id: sessionData?.user?.id,
        },
      },
      manufacturer: e.target.manufacturer.value as string,
      model: e.target.model.value as string,
      year: Number(e.target.year.value),
      performancePoints: Number(e.target.performancePoints.value),
      time:
        Number(e.target.minutes.value * 60) +
        Number(e.target.seconds.value) +
        Number(e.target.milliseconds.value / 1000),
      shareCode: e.target.shareCode.value as string,
    };

    //addEntry.mutate(EntryCreateOneSchema.parse({ data: entry }));
    // TODO refresh
    closeModal();
  }

  function renderButton() {
    if (sessionData?.user) {
      return CardComponent(
        <button
          type="button"
          onClick={openModal}
          className="h-full w-full rounded-md  px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:text-white"
        >
          Add Time
        </button>
      );
    } else {
      return CardComponent(
        <button
          disabled
          type="button"
          onClick={openModal}
          className="h-full w-full rounded-md  px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:text-white"
        >
          Please login to add your time
        </button>
      );
    }
  }

  const columnHelper = createColumnHelper<Entry & { user: User; car: Car }>();

  function header(input: string) {
    return <div className="flex text-xl dark:text-white">{input}</div>;
  }

  const columns = [
    columnHelper.display({
      id: "user.id",
      header: () => header("User"),
      cell: (props) => (
        <Link href={"/users/" + props.row.original.userId}>
          {props.row.original.user.name}
        </Link>
      ),
    }),

    columnHelper.accessor("car.make", {
      header: () => header("Car Manufacturer"),
    }),
    columnHelper.accessor("car.model", {
      header: () => header("Car Model"),
    }),
    columnHelper.accessor("car.year", {
      header: () => header("Car Year"),
    }),
    columnHelper.accessor("performancePoints", {
      header: () => header("Performance Points"),
      cell: (props) => PerformanceIndex(props.row.original.performancePoints),
    }),
    columnHelper.accessor((row) => formatTime(row.time), {
      id: "readableTime",
      header: () => header("Time"),
    }),
    columnHelper.accessor("shareCode", {
      header: () => header("Share Code"),
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
            <div className="basis-1/3">{renderButton()}</div>
          </div>
        )}

        <div>
          {TableComponent({
            data: track.data ? track.data.entries : [],
            columns: columns,
          })}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {CardComponent(
                  <Dialog.Panel className="max-w-md transform overflow-hidden p-6  transition-all">
                    <Dialog.Title className="text-xl font-bold text-white">
                      Add your Time
                    </Dialog.Title>
                    <div className="mt-2">
                      <form
                        onSubmit={handleAddEntryForm}
                        className="flex flex-col"
                      >
                        <div className="text-white">Car Manufacturer</div>
                        <input
                          type="text"
                          id="manufacturer"
                          name="manufacturer"
                          className="rounded bg-zinc-900 text-white"
                        />
                        <div className="text-white">Car Model</div>
                        <input
                          type="text"
                          id="model"
                          name="model"
                          className="rounded bg-zinc-900 text-white"
                        />
                        <div className="text-white">Car Year</div>
                        <input
                          type="number"
                          id="year"
                          name="year"
                          className="rounded bg-zinc-900 text-white"
                        />
                        <div className="text-white">Car Performance Points</div>
                        <input
                          type="number"
                          id="performancePoints"
                          name="performancePoints"
                          className="rounded bg-zinc-900 text-white"
                        />
                        <div className="grid grid-cols-3 gap-1">
                          <div className="w-full">
                            <div className="text-center text-white">
                              Minutes
                            </div>
                            <input
                              type="number"
                              id="minutes"
                              name="minutes"
                              className="w-full rounded bg-zinc-900 text-white"
                            />
                          </div>
                          <div className="w-full">
                            <div className="text-center text-white">
                              Seconds
                            </div>
                            <input
                              type="number"
                              id="seconds"
                              name="seconds"
                              className="w-full rounded bg-zinc-900 text-white"
                            />
                          </div>
                          <div className="w-full">
                            <div className="text-center text-white">
                              Milliseconds
                            </div>
                            <input
                              type="number"
                              id="milliseconds"
                              name="milliseconds"
                              className="w-full rounded bg-zinc-900 text-white"
                            />
                          </div>
                        </div>

                        <div className="text-white">Sharecode (optional)</div>
                        <input
                          type="text"
                          id="shareCode"
                          name="shareCode"
                          className="rounded bg-zinc-900 text-white"
                        />
                        <div className="pt-5">
                          {CardComponent(
                            <button
                              className="h-10 w-full text-white"
                              type="submit"
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
