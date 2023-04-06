interface Index {
  upper: number;
  class: string;
  color: string;
}

const performanceClasses: Index[] = [
  {
    upper: 100,
    class: "D",
    color: "bg-sky-300",
  },
  {
    upper: 600,
    class: "C",
    color: "bg-amber-300",
  },
  {
    upper: 700,
    class: "B",
    color: "bg-orange-500",
  },
  {
    upper: 800,
    class: "A",
    color: "bg-red-600",
  },
  {
    upper: 900,
    class: "S1",
    color: "bg-purple-500",
  },
  {
    upper: 998,
    class: "S2",
    color: "bg-blue-500",
  },
  {
    upper: 999,
    class: "X",
    color: "bg-green-600",
  },
];

export default function PerformanceIndex(performancePoints: number) {
  function getPerformanceClass(points: number): Index {
    for (const classes of performanceClasses) {
      if (points > classes.upper) {
        continue;
      }
      if (points <= classes.upper) {
        return classes;
      }
    }

    // TODO this is a dirty typescript fix and should never execute
    return {
      upper: 1000,
      class: "?",
      color: "bg-gray-600",
    };
  }

  const performanceClass: Index = getPerformanceClass(performancePoints);

  return (
    <div className="flex justify-center">
      <div
        className={
          performanceClass.color +
          " grid w-24 grid-cols-3 place-self-center rounded-lg p-1"
        }
      >
        <div className="text-center font-bold text-white">
          {performanceClass.class}
        </div>
        <div className="col-span-2 grow rounded-r bg-white text-center font-bold text-black">
          {performancePoints}
        </div>
      </div>
    </div>
  );
}
