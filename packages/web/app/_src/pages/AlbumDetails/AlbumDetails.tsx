import { Link } from "react-router";
import type AlbumDetail from "core/model/AlbumDetail.js";
import type Song from "core/model/Song.js";
import SongSummary from "@/src/pages/AlbumDetails/SongSummary";
import { Suspense } from "react";
import { trpc } from "@/src/trpc/trpcClient";

type Props = {
  album: AlbumDetail;
  songCids: string[];
  coverBase64: string;
  isFetchingAlbums: boolean;
};

export default function AlbumDetails(
  { album, songCids, coverBase64, isFetchingAlbums }: Props,
) {
  const [status, statusQuery] = trpc.albums.status.useSuspenseQuery(album.cid, {
    refetchInterval: isFetchingAlbums ? 1000 : false,
  });
  const fetchMutation = trpc.song.fetch.useMutation();

  return (
    <div>
      <img src={coverBase64} />
      <h1>{album.name}</h1>
      <ul>
        {songCids.map((cid) => (
          <li key={cid}>
            <Suspense fallback={"..."}>
              <SongSummary
                isFetching={isFetchingAlbums ||
                  status.statuses[cid].state === "fetch"}
                onFetchSong={(cid) => {
                  fetchMutation.mutate(cid);
                  statusQuery.refetch();
                }}
                song={{ cid, albumCid: album.cid }}
              />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
}
