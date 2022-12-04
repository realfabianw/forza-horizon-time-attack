import Link from "next/link";

export default function Footer() {
  return (
    <nav>
      <div className="container mx-auto flex flex-col">
        <div className="box-border grid justify-items-center rounded border bg-white/10 p-5 shadow">
          <div className="text-2xl">Forza Horizon Time Attack</div>
          <div>This project is open source.</div>
          <div className="text-center font-light">
            The information presented on this site about Forza Horizon 5, both
            literal and graphical, is copyrighted by Playground Games and Xbox
            Game Studios, which includes, but is not limited to the race tracks
            names and symbols. This website is not produced, endorsed,
            supported, or affiliated with Playground Games or Xbox Game Studios.
          </div>
        </div>
      </div>
    </nav>
  );
}
