import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import { Tab } from "@headlessui/react";
import TrackComponent from "../components/component.track";
import CardComponent from "../components/component.card";
import { HashLoader } from "react-spinners";
import PerformanceIndex from "../components/component.performance.index";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const tracks = trpc.tracks.readAll.useQuery();
  const categories = trpc.tracks.getAllCategories.useQuery();
  const lastEntries = trpc.entries.readLastEntries.useQuery(10);
  dayjs.extend(relativeTime);

  if (!categories.data) {
    return (
      <div className="align-center container mx-auto flex h-screen justify-center">
        <HashLoader className="self-center" color="white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto grid grid-cols-3 gap-3 px-5">
      <div className="col-span-2 ">
        <div className="py-3 text-center text-3xl font-extrabold text-white">
          EVENT LAB TRACKS
        </div>
        <div className="grid grid-cols-3 gap-3">
          {tracks.data &&
            tracks.data
              .filter((track) => track.category == categories.data.eventlab)
              .map((track, index) => (
                <div key={index}>{TrackComponent(track)}</div>
              ))}
        </div>
        <div className="pb-3 pt-20 text-center text-3xl font-extrabold text-white">
          ORIGINAL TRACKS
        </div>
        <Tab.Group>
          <Tab.List className="grid grid-cols-5 justify-between gap-3 pb-10">
            {categories.data.remaingingCategories.map((category, index) => (
              <div key={index} className="h-full">
                {CardComponent(
                  <Tab className="flex h-full w-full flex-col justify-between p-1">
                    <div className="mx-auto text-xl font-semibold dark:text-white">
                      {category}
                    </div>
                    <img
                      src={"/" + category + " Sprint.png"}
                      className="mx-auto h-auto w-12 object-contain"
                    />
                  </Tab>
                )}
              </div>
            ))}
          </Tab.List>
          <Tab.Panels>
            {categories.data.remaingingCategories.map((category, index) => (
              <Tab.Panel key={index} className="grid grid-cols-3 gap-3">
                {tracks.data &&
                  tracks.data
                    .filter((track) => track.category == category)
                    .map((track, index) => (
                      <div key={index}>{TrackComponent(track)}</div>
                    ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div>
        <div className="py-3 text-center text-3xl font-bold text-white">
          LATEST ENTRIES
        </div>
        <div className="grid grid-cols-1 gap-3 pl-5">
          {lastEntries.data?.map((entry, index) =>
            CardComponent(
              <div>
                <div className="flex flex-grow-0 p-3">
                  <Link
                    href={"/users/" + entry.userId}
                    className="flex flex-col place-content-center"
                  >
                    <img
                      src={entry.user.image ?? ""}
                      className="mx-auto w-12 rounded-full"
                    />
                    <div className="text-center font-semibold text-white">
                      {entry.user.name}
                    </div>
                  </Link>

                  <Link
                    href={"/" + entry.trackId}
                    className="flex grow flex-col place-content-center px-3"
                  >
                    <div className="font-semibold text-white">
                      {entry.track.name}
                    </div>
                    <div className="text-white">
                      {entry.car.make +
                        " " +
                        entry.car.model +
                        " (" +
                        entry.car.year +
                        ")"}
                    </div>
                  </Link>

                  {PerformanceIndex(entry.performancePoints)}
                  <div className="py-5 pl-3">
                    {CardComponent(
                      <button
                        className="mx-auto h-full w-full px-1"
                        onClick={() => router.push(entry.screenshotUrl)}
                      >
                        <CameraIcon className="mx-auto h-6 text-white" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="-mt-4 text-center font-mono text-zinc-500">
                  {dayjs(entry.timestamp).fromNow()}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
