import SongButton from "@/src/components/Button/SongButton";
import useInterval from "@/src/hooks/useInterval";
import Status from "@/src/pages/AlbumDetails/Status";
import { trpc } from "@/src/trpc/trpcClient";
import SongModel from "core/model/Song.js";
import { useCallback } from "react";

type Props = {
  song: Pick<SongModel, "cid" | "albumCid">;
  isFetchingStatus: boolean;
  onFetchSong: (cid: string) => void;
};

export default function SongSummary(
  { song: { cid, albumCid }, isFetchingStatus, onFetchSong }: Props,
) {
  const [{ song }] = trpc.song.detail.useSuspenseQuery(cid);
  const fetchMutation = trpc.song.fetch.useMutation();
  const [{ statuses }, statusQuery] = trpc.albums.status.useSuspenseQuery(
    albumCid,
    {
      refetchInterval: isFetchingStatus ? 1000 : false,
    },
  );
  const status = statuses[cid];

  const [_isUpdating, startUpdateStatus] = useInterval();

  const onClickSave = useCallback(async () => {
    await fetchMutation.mutateAsync(cid);
    startUpdateStatus((stop) => {
      statusQuery.refetch().then((data) => {
        if (!data.isSuccess) {
          return;
        }
        const { data: { statuses } } = data;
        if (statuses[cid].state !== "fetch") {
          stop();
        }
      });
    }, 1000);
  }, [cid]);

  return (
    <div>
      <SongButton
        type="button"
        onClick={onClickSave}
        renderStatus={() => (
          <Status state={status.state} progress={status.progress} />
        )}
      >
        {song.name}
      </SongButton>
    </div>
  );
}
