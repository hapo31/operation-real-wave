import LoopIcon from "@mui/icons-material/Loop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorIcon from "@mui/icons-material/Error";
type Props = {
  state: "fetch" | "not-exists" | "complete" | "error";
  progress: number;
};

export default function Status({ progress, state }: Props) {
  switch (state) {
    case "fetch":
      return (
        <span>
          <LoopIcon color="primary" /> {Math.ceil(progress * 10) / 10}%%
        </span>
      );
    case "not-exists":
      return <DownloadIcon color="primary" />;
    case "complete":
      return <PlayArrowIcon color="primary" />;
    case "error":
      return <ErrorIcon color="warning" />;
  }
}
