import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav>
      <div className="flex flex-nowrap items-baseline px-10 py-1">
        <div className="grow">
          <Link
            href="/"
            className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent"
          >
            FORZA HORIZON TIME ATTACK
          </Link>
        </div>

        {sessionData?.user && (
          <Link
            href={"/users/" + sessionData.user.id}
            className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text pr-5 text-lg font-extrabold text-transparent"
          >
            Profile
          </Link>
        )}
        <button
          className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-lg font-extrabold text-transparent"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}
