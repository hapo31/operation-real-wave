import { Link } from "@remix-run/react";
import { AlbumDetails } from "../../type.ts";

type Props = {
  albumDetails: AlbumDetails;
  coverBase64: string;
};

export default function Album({ albumDetails, coverBase64 }: Props) {
  return (
    <div>
      <img src={coverBase64} />
      <h1>{albumDetails.name}</h1>
      <ul>
        {albumDetails.songs.map((song) => (
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
