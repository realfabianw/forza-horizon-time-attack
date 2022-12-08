import { Entry } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../../utils/trpc";

const ProfilePage = () => {
  const router = useRouter();
  const id: string = router.query.id as string;
  const entries = trpc.entries.getAllFromUser.useQuery(id);

  const handleDelete = (entry: Entry) => {
    // Delete the entry from the entries array
    // ...
    // Update the entries array in the component state
    // ...
  };

  return (
    <div className="dark:bg-gray-800">
      <div className="mx-auto max-w-sm rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-gray-800 dark:text-gray-100">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile picture"
          className="mx-auto rounded-full"
        />
        <h1 className="mt-4 text-center text-2xl font-bold dark:text-gray-100">
          Jane Doe
        </h1>
        <p className="mt-2 text-center text-gray-700 dark:text-gray-100">
          Software Engineer
        </p>

        <div className="mt-8 px-4">
          <p className="mb-2 font-bold dark:text-gray-100">About Me:</p>
          <p className="text-gray-700 dark:text-gray-100">
            I am a software engineer with experience in building web
            applications.
          </p>
        </div>

        <div className="mt-8 px-4">
          <p className="mb-2 font-bold dark:text-gray-100">Entries:</p>
          {entries ? (
            <ul>
              {entries.data &&
                entries.data.map((entry, index) => (
                  <li
                    key={index}
                    className="mb-2 text-gray-700 dark:text-gray-100"
                  >
                    {entry.manufacturer}
                    <button
                      className="ml-2"
                      onClick={() => handleDelete(entry)}
                    >
                      <img src="https://via.placeholder.com/15" alt="Delete" />
                    </button>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-700 dark:text-gray-100">No entries</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
