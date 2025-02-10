import Paging from "@/src/components/Paging";
import usePaging from "@/src/components/usePaging";
import AlbumModel from "core/model/AlbumModel.js";
import { useState } from "react";

type Props = {
  albums: AlbumModel[];
};

export default function Albums({ albums }: Props) {
  const { slice, ...pagingProps } = usePaging(albums, 10);

  return (
    <div>
      <h1>Albums</h1>
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
