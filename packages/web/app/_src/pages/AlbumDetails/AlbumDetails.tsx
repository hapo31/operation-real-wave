import { Link } from "react-router";
import type AlbumDetail from "core/model/AlbumDetail.js";
import type Song from "core/model/Song.js";
import SongSummary from "@/src/pages/AlbumDetails/Song";
import { Suspense } from "react";

type Props = {
  album: AlbumDetail;
  songs: Song[];
  coverBase64: string;
};

export default function AlbumDetails({ album, songs, coverBase64 }: Props) {
  return (
    <div>
      <img src={coverBase64} />
      <h1>{album.name}</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.cid}>
            <Suspense fallback={"..."}>
              <SongSummary song={song} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
}
