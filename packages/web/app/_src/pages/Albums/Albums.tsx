import Paging from "@/src/components/Paging";
import usePaging from "@/src/components/usePaging";
import Album from "core/model/Album.js";

import * as styles from "./Albums.css";
import List from "@/src/components/List/List";

type Props = {
  albums: Album[];
};

export default function Albums({ albums }: Props) {
  const { slice, ...pagingProps } = usePaging(albums, 30);

  return (
    <div className={styles.container}>
      <Paging
        {...pagingProps}
      />
      <List
        items={slice.map((album) => ({
          key: album.cid,
          content: (
            <a className={styles.link} href={`/album/details/${album.cid}`}>
              {album.name}
            </a>
          ),
        }))}
      />
    </div>
  );
}
