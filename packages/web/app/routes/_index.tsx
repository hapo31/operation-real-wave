import { useLoaderData } from "react-router";
import { albumsApi } from "../_src/api/api.js";
import Albums from "@/src/pages/Albums/Albums.jsx";
import { trpc } from "@/src/trpc/trpc.client.js";

export async function loader() {
  const { albums } = await trpc.albums.list.query();
  return {
    albums,
  };
}

export default function IndexPage() {
  const { albums } = useLoaderData<typeof loader>();

  return <Albums albums={albums} />;
}
