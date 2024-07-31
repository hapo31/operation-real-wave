import { Album } from "@prisma/client";

type Props = {
  albums: Album[];
};

export default function Albums({ albums }: Props) {
  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.albumCid}>
            <a href={`/album/details/${album.albumCid}`}>{album.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
