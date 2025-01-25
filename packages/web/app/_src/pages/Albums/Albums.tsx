import { AlbumSummary } from "@/api/index";

type Props = {
  albums: AlbumSummary[];
};

export default function Albums({ albums }: Props) {
  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.cid}>
            <a href={`/album/details/${album.cid}`}>{album.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
