import { Link } from "@remix-run/react";
import { Album, Song } from "../../generated-orw/index.ts";

type Props = {
  album: Album;
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
            <Link to={`/songs/${song.cid}`}>
              {song.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
