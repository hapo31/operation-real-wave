import { Link } from "react-router";
import type AlbumModel from "core/model/AlbumModel.js";
import type SongModel from "core/model/SongModel.js";

type Props = {
  album: AlbumModel;
  songs: SongModel[];
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
