import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { HashLoader } from "react-spinners";
import { EntryCreateOneSchema } from "../../../../prisma/generated/schemas/createOneEntry.schema";
import CardComponent from "../../../components/component.card";
import { trpc } from "../../../utils/trpc";

export default function AddEntryPage() {
  const router = useRouter();
  const id: number = Number(router.query.id);

  const { data: sessionData } = useSession();

  const cars = trpc.cars.getAll.useQuery();
  const addEntry = trpc.entries.insert.useMutation();

  async function handleAddEntryForm(e: any) {
    e.preventDefault();
    console.log(e);
    console.log(e.target.car.value);
    const entry = {
      track: {
        connect: {
          id: id,
        },
      },
      car: {
        connect: {
          id: Number(e.target.car.value),
        },
      },
      user: {
        connect: {
          id: sessionData?.user?.id,
        },
      },

      performancePoints: Number(e.target.performancePoints.value),
      drivetrain: String(e.target.drivetrain.value),
      buildType: String(e.target.buildType.value),
      time:
        Number(e.target.minutes.value * 60) +
        Number(e.target.seconds.value) +
        Number(e.target.milliseconds.value / 1000),
      shareCode: String(e.target.shareCode.value),
      // as string
    };

    addEntry.mutate(EntryCreateOneSchema.parse({ data: entry }));
    // // TODO refresh
    // closeModal();
  }

  if (!cars.data) {
    return (
      <div className="align-center container mx-auto flex h-screen justify-center">
        <HashLoader className="self-center" color="white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-56">
      <form onSubmit={handleAddEntryForm} className="flex flex-col">
        <div className="dark:text-white">Car Manufacturer</div>
        <select name="car">
          {cars.data.map((car) => (
            <option key={car.id} value={car.id}>
              {car.make + " " + car.model + " (" + car.year + ")"}
            </option>
          ))}
        </select>

        <div className="dark:text-white">Car Performance Points</div>
        <input
          type="number"
          id="performancePoints"
          name="performancePoints"
          className="rounded bg-zinc-900 dark:text-white"
        />
        <div className="grid grid-cols-2 gap-1">
          <div className="w-full">
            <div className="text-center dark:text-white">Drivetrain</div>
            <select name="drivetrain" className="w-full">
              <option value="AWD">AWD</option>
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
            </select>
          </div>
          <div className="w-full">
            <div className="text-center dark:text-white">Build Type</div>
            <select name="buildType" className="w-full">
              <option value="Stock">Stock</option>
              <option value="Purist">Purist</option>
              <option value="Power">Power</option>
              <option value="Grip">Grip</option>
              <option value="Drift">Drift</option>
              <option value="Racing">Racing</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <div className="w-full">
            <div className="text-center dark:text-white">Minutes</div>
            <input
              type="number"
              id="minutes"
              name="minutes"
              className="w-full rounded bg-zinc-900 dark:text-white"
            />
          </div>
          <div className="w-full">
            <div className="text-center dark:text-white">Seconds</div>
            <input
              type="number"
              id="seconds"
              name="seconds"
              className="w-full rounded bg-zinc-900 dark:text-white"
            />
          </div>
          <div className="w-full">
            <div className="text-center dark:text-white">Milliseconds</div>
            <input
              type="number"
              id="milliseconds"
              name="milliseconds"
              className="w-full rounded bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="dark:text-white">Sharecode (optional)</div>
        <input
          type="text"
          id="shareCode"
          name="shareCode"
          className="rounded bg-zinc-900 dark:text-white"
        />
        <div className="pt-5">
          {CardComponent(
            <button className="h-10 w-full dark:text-white" type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
