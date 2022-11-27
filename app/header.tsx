import Link from "next/link";

export default function Header() {
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
