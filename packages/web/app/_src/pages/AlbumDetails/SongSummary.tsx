import { trpc } from "@/src/trpc/trpcClient";
import SongModel from "core/model/Song.js";
import { useCallback, useState } from "react";

type Props = {
  song: Pick<SongModel, "cid" | "albumCid">;
  isFetching: boolean;
  onFetchSong: (cid: string) => void;
};

export default function SongSummary(
  { song: { cid, albumCid }, isFetching, onFetchSong }: Props,
) {
  const [{ song }] = trpc.song.detail.useSuspenseQuery(cid);
  const fetchMutation = trpc.song.fetch.useMutation();
  const [{ statuses }, statusQuery] = trpc.albums.status.useSuspenseQuery(
    albumCid,
    {
      refetchInterval: isFetching ? 1000 : false,
    },
  );
  const status = statuses[cid];

  const onClickSave = useCallback(async () => {
    await fetchMutation.mutateAsync(cid);
    statusQuery.refetch();
  }, [cid]);

  return (
    <div>
      <p>{status.state}({Math.ceil(status.progress * 10) / 10}%)</p>
      <button
        type="button"
        onClick={onClickSave}
        disabled={fetchMutation.isPending}
      >
        <p>{song.name}</p>
      </button>
    </div>
  );
}
