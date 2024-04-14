import { escapeFileName } from "./file.js";
import ffmpeg from "fluent-ffmpeg";

type Metadata = {
  title: string;
  genre: string;
  artworkPath: string;
  albumArtists: string;
  artists: string;
  track: string;
  album: string;
  copyright: string;
};

export function addMetadata(command: ffmpeg.FfmpegCommand, metaData: Metadata) {
  return command
    .addInput(escapeFileName(metaData.artworkPath))
    .outputOptions(
      `-map`,
      `0:a`,
      `-map`,
      `1:v`,
      `-disposition:1`,
      `attached_pic`
    )
    .outputOptions("-metadata", `title=${metaData.title}`)
    .outputOptions("-metadata", `album_artist=${metaData.albumArtists}`)
    .outputOptions("-metadata", `artist=${metaData.artists}`)
    .outputOptions("-metadata", `track=${metaData.track}`)
    .outputOptions("-metadata", `album=${metaData.album}`)
    .outputOptions("-metadata", `genre=${metaData.genre}`)
    .outputOptions("-metadata", `copyright=${metaData.copyright}`);
}
