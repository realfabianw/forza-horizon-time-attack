import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav>
      <div className="flex flex-nowrap justify-between px-10 py-1">
        <Link
          href="/"
          className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent"
        >
          Forza Horizon Time Attack
        </Link>
        <button
          className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}
