import { PropsWithChildren, ReactNode } from "react";
import * as styles from "./songButton.css";

type Props = {
  onClick: () => void;
  onClickStatus?: () => void;
  renderStatus?: () => ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type: "button" | "submit" | "reset";
};

export default function SongButton(
  { disabled, loading, onClick, type, children, onClickStatus, renderStatus }:
    PropsWithChildren<Props>,
) {
  return (
    <div
      className={styles.container}
    >
      <button className={styles.statusButton} onClick={onClickStatus}>
        {renderStatus?.()}
      </button>
      <button
        className={styles.bodyButton}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
      >
        <span className={styles.inner}>
          {children}
        </span>
      </button>
    </div>
  );
}
