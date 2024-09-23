import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Albums from "../_src/pages/Albums/Albums.tsx";
import { albumsApi } from "../_src/api/api.ts";

export async function loader() {
  const albums = await albumsApi().albumsGet();

  return typedjson({ albums: albums.albums });
}

export default function AlbumsRoute() {
  const { albums } = useTypedLoaderData<typeof loader>();

  return <Albums albums={albums} />;
}
