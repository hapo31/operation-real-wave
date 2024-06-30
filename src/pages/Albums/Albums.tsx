import { Album } from "../../type.ts";

type Props = {
  albums: Album[];
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
