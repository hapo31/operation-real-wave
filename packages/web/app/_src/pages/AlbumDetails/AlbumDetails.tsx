import type AlbumDetail from "core/model/AlbumDetail.js";
import SongSummary from "@/src/pages/AlbumDetails/SongSummary";
import { Suspense } from "react";
import { trpc } from "@/src/trpc/trpcClient";

import * as styles from "./AlbumDetails.css";
import List from "@/src/components/List/List";

type Props = {
  album: AlbumDetail;
  songCids: string[];
  coverBase64: string;
};

export default function AlbumDetails(
  { album, songCids, coverBase64 }: Props,
) {
  const albumFetchMutation = trpc.albums.fetch.useMutation();
  const [status, statusQuery] = trpc.albums.status.useSuspenseQuery(album.cid, {
    refetchInterval: albumFetchMutation.isPending ? 1000 : false,
  });
  const fetchMutation = trpc.song.fetch.useMutation();

  const onCickSave = async () => {
    await albumFetchMutation.mutateAsync({ albumCid: album.cid });
  };

  return (
    <div>
      <img className={styles.coverImg} src={coverBase64} />
      <div
        className={styles.detailsContainer}
      >
        <h1>{album.name}</h1>
        <List
          items={songCids.map((cid) => ({
            key: cid,
            content: (
              <Suspense fallback={"..."}>
                <SongSummary
                  isFetchingStatus={albumFetchMutation.isPending ||
                    status.statuses[cid].state === "fetch"}
                  song={{ cid, albumCid: album.cid }}
                />
              </Suspense>
            ),
          }))}
        />

        <button
          type="button"
          onClick={onCickSave}
          disabled={fetchMutation.isPending}
        >
          アルバムを保存
        </button>
      </div>
    </div>
  );
}
