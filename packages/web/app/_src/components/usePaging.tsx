import Paging from "@/src/components/Paging";
import { ComponentProps, useMemo, useState } from "react";

type UsePagingReturn<T> = ComponentProps<typeof Paging> & {
  slice: T[];
  maxPage: number;
};

export default function usePaging<T>(
  srcList: T[],
  pageSize: number,
): UsePagingReturn<T> {
  const [page, setPage] = useState(0);

  const maxPage = useMemo(() => Math.ceil(srcList.length / pageSize) - 1, [
    srcList,
  ]);

  const slice = useMemo(() => {
    if (page < 0) {
      return calcSlice(srcList, 0, pageSize);
    }
    if (page > maxPage) {
      return calcSlice(srcList, maxPage, pageSize);
    }
    return calcSlice(srcList, page, pageSize);
  }, [page, srcList, pageSize]);

  return {
    slice,
    page: page < 0 ? 0 : page + 1 > maxPage ? maxPage : page,
    maxPage,
    onChangePage: setPage,
  };
}

function calcSlice<T>(src: T[], page: number, pageSize: number): T[] {
  return src.slice(page * pageSize, (page + 1) * pageSize);
}
