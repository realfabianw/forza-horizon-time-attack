import { Dialog, Transition } from "@headlessui/react";
import { useReactTable } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { EntryCreateOneSchema } from "../../../prisma/generated/schemas/createOneEntry.schema";
import EntryTable from "../../components/component.table.entry";
import { trpc } from "../../utils/trpc";

export default function TrackPage() {
  const router = useRouter();
  const id: string = router.query.id as string;

  const track = trpc.tracks.getById.useQuery(id);

  const addEntry = trpc.entries.insert.useMutation();
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
      time: Number(e.target.time.value),
      shareCode: e.target.shareCode.value as string,
    };

    addEntry.mutate(EntryCreateOneSchema.parse({ data: entry }));
    // TODO refresh
    closeModal();
  }

  function renderButton() {
    if (sessionData?.user) {
      return (
        <button
          type="button"
          onClick={openModal}
          className="basis-1/3 rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:text-white"
        >
          Add Time
        </button>
      );
    } else {
      return (
        <button
          disabled
          type="button"
          className="basis-1/3 rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:text-white"
        >
          Please login to add your time
        </button>
      );
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="flex flex-row pb-10">
          {track.data && (
            <img
              src={"/" + track.data.category + " " + track.data.type + ".png"}
              alt={track.data.category + " " + track.data.type}
              className="mx-auto h-auto w-12 object-contain"
            />
          )}
          {track.data && (
            <div className="flex basis-2/3 flex-col">
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
          )}
          {renderButton()}
        </div>
        <div>{EntryTable(id)}</div>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add your Time
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col">
                    <form
                      onSubmit={handleAddEntryForm}
                      className="flex flex-col"
                    >
                      <label>Car Manufacturer</label>
                      <input
                        className="border"
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                      />
                      <label>Car Model</label>
                      <input
                        className="border"
                        type="text"
                        id="model"
                        name="model"
                      />
                      <label>Car Year</label>
                      <input
                        className="border"
                        type="text"
                        id="year"
                        name="year"
                      />
                      <label>Car Performance Points</label>
                      <input
                        className="border"
                        type="text"
                        id="performancePoints"
                        name="performancePoints"
                      />
                      <label>Time (in seconds)</label>
                      <input
                        className="border"
                        type="text"
                        id="time"
                        name="time"
                      />
                      <label>Sharecode (optional)</label>
                      <input
                        className="border"
                        type="text"
                        id="shareCode"
                        name="shareCode"
                      />
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
