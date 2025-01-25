import type { Route } from "../+types/root.js";
import AlbumDetails from "../_src/pages/AlbumDetails/AlbumDetails.jsx";
import { albumsApi } from "../_src/api/api.js";
import { useLoaderData } from "react-router";

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return `data:image/jpeg;base64,${btoa(binary)}`;
}

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
    songs: details.songs,
    coverBase64: arrayBufferToBase64(arrayBuffer),
  };
}

export default function AlbumsRoute() {
  const { album, songs, coverBase64 } = useLoaderData<typeof loader>();

  return <AlbumDetails coverBase64={coverBase64} album={album} songs={songs} />;
}
