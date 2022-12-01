import { trpc } from "../../utils/trpc";
import TrackComponent from "../../components/component.track";
import { Tab } from "@headlessui/react";
import { useState } from "react";

export default function TracksPage() {
  const tracks = trpc.tracks.getAll.useQuery();
  const categories = trpc.tracks.getAllCategories.useQuery();

  return (
    <div className="container mx-auto">
      <Tab.Group>
        <Tab.List className="grid grid-cols-6 justify-between gap-3 py-10">
          {categories.data &&
            categories.data.map((category) => (
              <Tab className="box-border flex h-auto flex-col justify-between rounded border bg-white/10 p-1 shadow">
                <div className="mx-auto text-xl font-semibold">{category}</div>
                <img
                  src={"/" + category + " Sprint.png"}
                  className="mx-auto h-auto w-12 object-contain"
                />
              </Tab>
            ))}
        </Tab.List>
        <Tab.Panels>
          {categories.data &&
            categories.data.map((category) => (
              <Tab.Panel className="grid grid-cols-3 gap-3">
                {tracks.data &&
                  tracks.data
                    .filter((track) => track.category == category)
                    .map((track) => TrackComponent(track))}
              </Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
