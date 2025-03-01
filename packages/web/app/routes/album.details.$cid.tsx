import type { Route } from "../+types/root.js";
import AlbumDetails from "../_src/pages/AlbumDetails/AlbumDetails.jsx";
import { useLoaderData } from "react-router";

import imageToDataURL from "../_src/api/imageToDataURL.js";
import { trpc, trpcClient } from "@/src/trpc/trpcClient.js";
import { Suspense } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const cid = params.cid;
  if (cid == null) {
    throw new Error("No cid provided");
  }
  const { album } = await trpcClient.albums.details.query(cid);
  return {
    album,
    songs: album.songCids,
    coverBase64: await imageToDataURL(album.coverPath),
  };
}

export default function AlbumsRoute() {
  const { album, songs, coverBase64 } = useLoaderData<typeof loader>();
  const fetchMutation = trpc.albums.fetch.useMutation();
  const onCickSave = async () => {
    await fetchMutation.mutateAsync({ albumCid: album.cid });
  };

  return (
    <div>
      <input type="hidden" name="albumCid" value={album.cid} />
      <Suspense fallback={"..."}>
        <AlbumDetails
          coverBase64={coverBase64}
          album={album}
          songCids={songs}
          isFetchingAlbums={fetchMutation
            .isPending}
        />
      </Suspense>
      <button
        type="button"
        onClick={onCickSave}
        disabled={fetchMutation.isPending}
      >
        アルバムを保存
      </button>
    </div>
  );
}
