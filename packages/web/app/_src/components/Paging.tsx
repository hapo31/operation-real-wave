import { useState } from "react";

import * as styles from "./paging.css";

type Props<T> = {
  page: number;
  maxPage: number;
  onChangePage: (page: number) => void;
};

export default function Paging<T>(
  { page, maxPage, onChangePage }: Props<T>,
) {
  return (
    <div className={styles.pagingContainer}>
      <button onClick={() => onChangePage(page - 1)}>
        {"<"}
      </button>
      <span>{page + 1}/{maxPage + 1}</span>
      <button onClick={() => onChangePage(page + 1)}>
        {">"}
      </button>
    </div>
  );
}
