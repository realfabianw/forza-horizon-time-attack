import { useState } from "react";
import { useRouter } from "next/router";
import { Storage } from "@google-cloud/storage";
import { trpc } from "../../../utils/trpc";

const UploadImageForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const uploadImage = trpc.entries.uploadImage.useMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: any = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setError("Please select an image to upload");
      return;
    }

    console.log(file);

    let gcsConnection: any = await uploadImage.mutateAsync(file.name);

    console.log(gcsConnection);

    const uploadResponse = await fetch(gcsConnection.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg", //file.type,
      },
      body: file,
    });

    if (uploadResponse.ok) {
      console.log("Image uploaded successfully!");
      console.log(gcsConnection.publicUrl);
    } else {
      console.error("Image upload failed:", await uploadResponse.text());
    }

    // OLD CODE BELOW
    // const filename = file.name;

    // const fileStream = bucket.file(filename).createWriteStream({
    //   metadata: {
    //     contentType: file.type,
    //   },
    //   resumable: false,
    // });

    // fileStream.on("error", (err) => {
    //   console.error(err);
    //   setError("An error occurred while uploading the image");
    // });

    // fileStream.on("finish", async () => {
    //   const publicUrl = `https://storage.googleapis.com/my-bucket-name/${filename}`;
    //   setImageUrl(publicUrl);
    //   router.push("/success");
    // });

    // const blobStream = file.createReadStream();
    // blobStream.pipe(fileStream);
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file-input"
            className="block font-medium text-gray-700"
          >
            Select an image to upload:
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="mt-2 rounded-md border border-gray-300 p-2"
            onChange={handleFileChange}
          />
        </div>
        {error && (
          <div className="text-sm font-medium text-red-500">{error}</div>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-500 py-2 px-4 font-medium text-white hover:bg-indigo-600"
        >
          Upload
        </button>
      </form>
      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            className="h-auto max-w-full"
            alt="Uploaded image"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImageForm;
