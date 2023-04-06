import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <nav>
      <div className="flex flex-nowrap items-baseline px-10 py-1">
        <div className="grow">
          <Link href="/" className="text-3xl font-extrabold text-white">
            FORZA HORIZON TIME ATTACK
          </Link>
        </div>

        {sessionData?.user && (
          <Link
            href={"/users/" + sessionData.user.id}
            className="pr-5 text-lg font-extrabold text-white"
          >
            Profile
          </Link>
        )}
        <button
          className="text-lg font-extrabold text-white"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}
