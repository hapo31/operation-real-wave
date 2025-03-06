import { ReactNode } from "react";
import * as styles from "./List.css";
import clsx from "clsx";

type Props = {
  items: { key: string; content: ReactNode }[];
  className?: string;
};

export default function List({ items, className }: Props) {
  return (
    <ul className={clsx(styles.container, className)}>
      {items.map(({ content, key }) => (
        <li className={styles.item} key={key}>
          {content}
        </li>
      ))}
    </ul>
  );
}
