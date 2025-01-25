import type { Route } from "../+types/root.js";
import AlbumDetails from "../_src/pages/AlbumDetails/AlbumDetails.jsx";
import { albumsApi } from "../_src/api/api.js";
import { useLoaderData } from "react-router";

import imageToDataURL from "../_src/api/imageToDataURL.js";

export async function loader({ params }: Route.LoaderArgs) {
  const cid = params.cid;
  if (cid == null) {
    throw new Error("No cid provided");
  }
  const details = await albumsApi().albumCidGet(cid);

  // アルバムカバー画像はクロスサイト制限が掛かっているかで直接読み込めないので
  // サーバー側で base64 にして返す
  const arrayBuffer = await fetch(details.album.coverPath).then((res) =>
    res.arrayBuffer()
  );

  return {
    album: details.album,
    songs: details.album.songs,
    coverBase64: await imageToDataURL(details.album.coverPath),
  };
}

export default function AlbumsRoute() {
  const { album, songs, coverBase64 } = useLoaderData<typeof loader>();

  return <AlbumDetails coverBase64={coverBase64} album={album} songs={songs} />;
}
