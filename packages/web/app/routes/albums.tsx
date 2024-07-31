import { typedjson, useTypedLoaderData } from "remix-typedjson";
import * as api from "../../core/src/api.ts";
import Albums from "../_src/pages/Albums/Albums.tsx";

export async function loader() {
  const albums = await api.albums();

  return typedjson({ albums: albums.data });
}

export default function AlbumsRoute() {
  const { albums } = useTypedLoaderData<typeof loader>();

  return <Albums albums={albums} />;
}
