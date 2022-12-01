import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav>
      <div className="flex flex-nowrap">
        <div className="">🏎️</div>
        <Link href="/">Home</Link>
        <Link href="/tracks">Racetracks</Link>
        <button
          className="rounded-full"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}
