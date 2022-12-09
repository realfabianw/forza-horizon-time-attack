import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import { Tab } from "@headlessui/react";
import TrackComponent from "../components/component.track";
import CardComponent from "../components/component.card";

const Home: NextPage = () => {
  const tracks = trpc.tracks.getAll.useQuery();
  const categories = trpc.tracks.getAllCategories.useQuery();

  return (
    <div className="container mx-auto">
      <Tab.Group>
        <Tab.List className="grid grid-cols-6 justify-between gap-3 py-10">
          {categories.data &&
            categories.data.map((category, index) => (
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
          {categories.data &&
            categories.data.map((category, index) => (
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
