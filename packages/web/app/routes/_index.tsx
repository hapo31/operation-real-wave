import Albums from "@/src/pages/Albums/Albums.jsx";
import { trpcClient } from "@/src/trpc/trpcClient";
import { useLoaderData } from "react-router";

export async function loader() {
  const { albums } = await trpcClient.albums.list.query();

  return albums;
}

export default function IndexPage() {
  const albums = useLoaderData<typeof loader>();

  return <Albums albums={albums} />;
}
