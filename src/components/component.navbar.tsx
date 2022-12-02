import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav>
      <div className="flex flex-nowrap justify-between px-10 py-1">
        <Link
          href="/"
          className="rounded-3xl px-5 text-2xl font-bold hover:bg-black/50"
        >
          Forza Horizon Time Attack
        </Link>
        <button
          className="rounded-3xl px-5 text-2xl font-bold hover:bg-black/50"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}
