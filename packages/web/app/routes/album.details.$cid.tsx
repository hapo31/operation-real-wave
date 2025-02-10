import type { Route } from "../+types/root.js";
import AlbumDetails from "../_src/pages/AlbumDetails/AlbumDetails.jsx";
import { useLoaderData } from "react-router";

import imageToDataURL from "../_src/api/imageToDataURL.js";
import { trpcClient } from "@/src/trpc/trpcClient.js";

export async function loader({ params }: Route.LoaderArgs) {
  const cid = params.cid;
  if (cid == null) {
    throw new Error("No cid provided");
  }
  const { album } = await trpcClient.albums.details.query(cid);

  // アルバムカバー画像はクロスサイト制限が掛かっているかで直接読み込めないので
  // サーバー側で base64 にして返す
  const arrayBuffer = await fetch(album.coverPath).then((res) =>
    res.arrayBuffer()
  );

  return {
    album: album,
    songs: album.songs,
    coverBase64: await imageToDataURL(album.coverPath),
  };
}

export default function AlbumsRoute() {
  const { album, songs, coverBase64 } = useLoaderData<typeof loader>();

  return <AlbumDetails coverBase64={coverBase64} album={album} songs={songs} />;
}
