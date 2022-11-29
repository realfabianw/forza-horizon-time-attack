import { Dialog, Transition } from "@headlessui/react";
import { Entry } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { number } from "zod";
import { EntryCreateOneSchema } from "../../../../prisma/generated/schemas/createOneEntry.schema";
import { trpc } from "../../../utils/trpc";

export default function TrackPage() {
  const router = useRouter();
  console.log(router);
  const id: string = String(router.query.id);

  const track = trpc.tracks.getById.useQuery(id);
  const entries = trpc.entries.getByTrackId.useQuery(id);
  const addEntry = trpc.entries.insert.useMutation();
  const { data: sessionData } = useSession();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleAddEntryForm(e: any) {
    e.preventDefault();

    console.log(e);

    // let entry = {
    //   trackId: id,
    //   userId: "123",
    //   manufacturer: e.target.manufacturer.value,
    //   model: e.target.model.value,
    //   year: e.target.year.value,
    //   performancePoints: e.target.performancePoints.value as number,
    //   time: e.target.time.value as number,
    //   shareCode: e.target.shareCode.value as number,
    // };

    let entry = {
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

    let parse = EntryCreateOneSchema.parse({ data: entry });

    addEntry.mutate(parse);

    closeModal();
  }

  return (
    <>
      <div>
        <div>{track.data && track.data.name}</div>
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Time
        </button>
        {entries &&
          entries.data?.map((entry, index) => (
            <div className="rounded border bg-white/10 p-5">
              <div>{entry.manufacturer}</div>
              <div>{entry.model}</div>
              <div>{entry.time}</div>
            </div>
          ))}
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
    </>
  );
}
