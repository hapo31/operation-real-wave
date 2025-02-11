import { trpc } from "@/src/trpc/trpcClient";
import SongModel from "core/model/Song.js";

type Props = {
  song: Pick<SongModel, "cid">;
};

export default function SongSummary({ song: { cid } }: Props) {
  const [{ song }] = trpc.song.detail.useSuspenseQuery(cid);

  return (
    <div>
      <h1>{song.name}</h1>
    </div>
  );
}
