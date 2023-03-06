import Link from "next/link";
import CardComponent from "./component.card";

export default function Footer() {
  return (
    <nav>
      <div className="container mx-auto py-5">
        {CardComponent(
          <div className="grid justify-items-center">
            <div className="text-2xl dark:text-white">
              Forza Horizon Time Attack
            </div>
            <div className="dark:text-zinc-300">
              Forza Horizon Time Attack is an online leaderboard for all
              official and selected Event Lab tracks in Forza Horizon 5. Share
              your best times with the community.
            </div>
            <div className="dark:text-white">
              This project is{" "}
              <Link
                href="https://github.com/realfabianw/forza-horizon-time-attack"
                className="font-bold underline decoration-orange-500"
              >
                open source
              </Link>
            </div>
            <div className="text-center font-light dark:text-zinc-500">
              The information presented on this site about Forza Horizon 5, both
              literal and graphical, is copyrighted by Playground Games and Xbox
              Game Studios, which includes, but is not limited to the race
              tracks names and symbols. This website is not produced, endorsed,
              supported, or affiliated with Playground Games or Xbox Game
              Studios.
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
