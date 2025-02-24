// @deno-types="npm:@types/fluent-ffmpeg"
import ffmpeg from "fluent-ffmpeg";

import { SafeFilePath } from "../lib/safeFilePath.ts";
import Song from "../model/Song.ts";

type State = "fetch" | "convert";

export default class FfmpegService {
  // #onProgress: (progress: number, state: State) => void;

  // constructor(onProgress: (progress: number, state: State) => void) {
  //   this.#onProgress = onProgress;
  // }

  save(dist: SafeFilePath, song: Song) {
    return new Promise((resolve, reject) => {
      ffmpeg(song.sourceUrl).format("flac")
        .save(dist.toString())
        .on("progress", (progress) => {
          console.log({ progress });
        })
        .on("end", resolve)
        .on("error", reject);
    });
  }
}
