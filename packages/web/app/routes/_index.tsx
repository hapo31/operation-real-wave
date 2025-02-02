import { useLoaderData } from "react-router";
import { albumsApi } from "../_src/api/api.js";
import Albums from "@/src/pages/Albums/Albums.jsx";

export async function loader() {
  const { albums } = await albumsApi().getAlbums();
  return {
    albums,
  };
}

export default function IndexPage() {
  const { albums } = useLoaderData<typeof loader>();

  return <Albums albums={albums} />;
}
