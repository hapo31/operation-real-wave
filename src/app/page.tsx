import { Album } from "@core/type.js";
import { List, ListItem } from "@yamada-ui/react";
import fetcher from "@utils/fetcher.js";

export default async function AllAlbumsPage() {
  const allAlbums = await fetchAllAlbums();
  return (
    <List>
      {allAlbums.map((album) => (
        <ListItem key={album.cid}>{album.name}</ListItem>
      ))}
    </List>
  );
}

async function fetchAllAlbums(): Promise<Album[]> {
  const res = await fetcher("albums");
  const json = await res.json();
  return json;
}
