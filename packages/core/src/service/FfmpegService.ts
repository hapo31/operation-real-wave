// @deno-types="npm:@types/fluent-ffmpeg"
import ffmpeg, { FfmpegCommand } from "fluent-ffmpeg";

import { SafeFilePath, safeMkdir } from "../lib/safeFilePath.ts";
import Song from "../model/Song.ts";
import FileStatusService from "./FileStatusService.ts";
import AlbumDetail from "../model/AlbumDetail.ts";

export default class FfmpegService {
  fileStatusService: FileStatusService;
  constructor(fileStatusService: FileStatusService) {
    this.fileStatusService = fileStatusService;
  }

  async save(dist: SafeFilePath, song: Song, album: AlbumDetail): Promise<void> {
    await safeMkdir(dist);

    return new Promise((resolve, reject) => {
      this.addMetadata(ffmpeg(song.sourceUrl), song, album)
        .format("flac")
        .save(dist.toString())
        .on("start", () => {
          // 取得が始まった時点で呼び出し元に制御を返す
          resolve();
        })
        .on("progress", (progress) => {
          this.fileStatusService.update({
            albumCid: song.albumCid,
            cid: song.cid,
            state: "fetch",
            progress: progress.percent ?? 0,
            throughput: progress.currentKbps,
          });
        })
        .on("end", async () => {
          await this.fileStatusService.update({
            albumCid: song.albumCid,
            cid: song.cid,
            state: "complete",
            progress: 100,
            throughput: 0,
          });
        })
        .on("error", async (e) => {
          await this.fileStatusService.update({
            albumCid: song.albumCid,
            cid: song.cid,
            state: "error",
            progress: 0,
            throughput: 0,
            errorTrace: e.message,
          });
          reject(e);
        });
    });
  }

  private addMetadata(command: FfmpegCommand, song: Song, album: AlbumDetail) {
    const track = album.songCids.findIndex((s) => s === song.cid) + 1;

    return command.outputOptions(
      `-map`,
      `0:a`,
      `-map`,
      `1:v`,
      `-disposition:1`,
      `attached_pic`,
    ).addInput(album.coverUrl)
      .outputOptions("-metadata", `title=${song.name}`)
      .outputOptions("-metadata", `album_artist=${album.artistes?.join("/") ?? ""}`)
      .outputOptions("-metadata", `artist=${song.artists}`)
      .outputOptions("-metadata", `track=${track}/${album.songCids.length}`)
      .outputOptions("-metadata", `album=${album.name}`)
      .outputOptions("-metadata", `genre=soundtrack`)
      .outputOptions("-metadata", `copyright=hypergryph`);
  }
}
