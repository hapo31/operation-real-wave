import { fetchAllAlbums } from "@api/albums/route.js";

export default async function AlbumsListPage() {
  const allAlbums = await fetchAllAlbums();

  return;
}
