import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import { Tab } from "@headlessui/react";
import TrackComponent from "../components/component.track";
import CardComponent from "../components/component.card";
import { HashLoader } from "react-spinners";

const Home: NextPage = () => {
  const tracks = trpc.tracks.getAll.useQuery();
  const categories = trpc.tracks.getAllCategories.useQuery();

  if (!categories.data) {
    return (
      <div className="align-center container mx-auto flex h-screen justify-center">
        <HashLoader className="self-center" color="white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
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
      <div className="pt-20 pb-3 text-center text-3xl font-extrabold text-white">
        OTHER CATEGORIES
      </div>
      <Tab.Group>
        <Tab.List className="grid grid-cols-5 justify-between gap-3 py-10">
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
  );
};

export default Home;
