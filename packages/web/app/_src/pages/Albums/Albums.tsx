import Paging from "@/src/components/Paging";
import usePaging from "@/src/components/usePaging";
import Album from "core/model/Album.js";

type Props = {
  albums: Album[];
};

export default function Albums({ albums }: Props) {
  const { slice, ...pagingProps } = usePaging(albums, 30);

  return (
    <div>
      <Paging
        {...pagingProps}
      />
      <ul>
        {slice.map((album) => (
          <li key={album.cid}>
            <a href={`/album/details/${album.cid}`}>{album.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
