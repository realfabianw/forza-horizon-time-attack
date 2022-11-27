import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-nowrap">
        <div className="">🏎️</div>
        <Link href="/">Home</Link>
        <Link href="/tracks">Racetracks</Link>
      </div>
    </nav>
  );
}
