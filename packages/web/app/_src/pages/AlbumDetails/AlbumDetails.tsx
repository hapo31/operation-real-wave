import { Link } from "react-router";
import type AlbumDetail from "core/model/AlbumDetail.js";
import type Song from "core/model/Song.js";
import SongSummary from "@/src/pages/AlbumDetails/SongSummary";
import { Suspense } from "react";

type Props = {
  album: AlbumDetail;
  songCids: string[];
  coverBase64: string;
};

export default function AlbumDetails({ album, songCids, coverBase64 }: Props) {
  return (
    <div>
      <img src={coverBase64} />
      <h1>{album.name}</h1>
      <ul>
        {songCids.map((cid) => (
          <li key={cid}>
            <Suspense fallback={"..."}>
              <SongSummary song={{ cid }} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
}
