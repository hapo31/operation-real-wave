import Albums from "../_src/pages/Albums/Albums.js";
import { albumsApi } from "../_src/api/api.js";
import { useLoaderData } from "react-router";

export async function loader() {
  const { albums } = await albumsApi().albumsGet();
  return {
    albums,
  };
}

export default function AlbumsRoute() {
  const { albums } = useLoaderData<typeof loader>();

  return <Albums albums={albums} />;
}
