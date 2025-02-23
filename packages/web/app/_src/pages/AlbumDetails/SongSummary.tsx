import { trpc } from "@/src/trpc/trpcClient";
import SongModel from "core/model/Song.js";

type Props = {
  song: Pick<SongModel, "cid">;
};

export default function SongSummary({ song: { cid } }: Props) {
  const [{ song }] = trpc.song.detail.useSuspenseQuery(cid);
  const fetchMutation = trpc.song.fetch.useMutation();

  const onClickSave = async () => fetchMutation.mutateAsync(cid);

  return (
    <div>
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
