import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { LoaderFunctionArgs } from "@remix-run/node";
import * as api from "../../src/api.ts";
import AlbumDetails from "../../src/pages/AlbumDetails/AlbumDetails.tsx";

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return `data:image/jpeg;base64,${btoa(binary)}`;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const cid = params.cid;
  const details = await api.albumDetails(cid);

  // アルバムカバー画像はクロスサイト制限が掛かっているかで直接読み込めないので
  // サーバー側で base64 にして返す
  const arrayBuffer = await fetch(details.data.coverUrl).then((res) =>
    res.arrayBuffer()
  );

  return typedjson({
    albumDetails: details.data,
    coverBase64: arrayBufferToBase64(arrayBuffer),
  });
}

export default function AlbumsRoute() {
  const { albumDetails, coverBase64 } = useTypedLoaderData<typeof loader>();

  return <AlbumDetails coverBase64={coverBase64} albumDetails={albumDetails} />;
}
