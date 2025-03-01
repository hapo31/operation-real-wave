import { useCallback, useEffect, useState } from "react";

export default function useInterval() {
  const [timer, setTimer] = useState(-1);

  const start = useCallback(
    (callback: (stop: () => void) => void, ms: number) => {
      if (timer !== -1) {
        clearTimeout(timer);
      }
      const innerCallback = () => {
        let newTimer = -1;
        const stop = () => {
          clearTimeout(newTimer);
          setTimer(-1);
        };

        callback(stop);
        newTimer = window.setTimeout(
          innerCallback,
          ms,
        );

        setTimer(newTimer);
      };
      setTimer(window.setTimeout(innerCallback, ms));
    },
    [],
  );
  return [timer != -1, start] as const;
}
