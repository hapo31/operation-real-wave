import pLimit from "p-limit";
import * as api from "./api.js";
import * as fs from "fs/promises";
import { setTimeout } from "timers/promises";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import parseOption from "./optionts.js";
import diffArray from "./diff.js";
import {
  enumurateAlbumListFromDir,
  escapeFileName,
  safeIsExists,
  safeMkdir,
  safeWriteFile,
} from "./file.js";

(async function main() {
  const { data: albums } = await api.albums();
  const limit = pLimit(3);

  const option = parseOption();

  const basePath = option.output;

  const targetAlbums =
    option.force || option["meta-only"]
      ? albums.map((v) => ({
          ...v,
          name: v.name.trim(),
          originalName: v.name,
        }))
      : diffArray(
          "name",
          albums.map((v) => ({
            ...v,
            name: v.name.trim(),
            originalName: v.name,
          })),
          await enumurateAlbumListFromDir("dist")
        );

  console.log(
    `Scheduled acquiring albums count: ${targetAlbums.length}`,
    option.force ? "(force)" : "",
    option["meta-only"] ? "(meta-only)" : ""
  );

  await Promise.all(
    targetAlbums.map((album) =>
      limit(async () => {
        async function onError() {
          await fs.rm(escapeFileName(basePath, album.name), {
            recursive: true,
            force: true,
          });
        }

        const { data: details } = await api.albumDetails(album.cid);
        const albumPath = escapeFileName(basePath, album.name);

        await safeMkdir(basePath, album.name);
        await safeMkdir(".tmp", albumPath);

        if (!(await safeIsExists(albumPath, `${album.name}.jpg`))) {
          const artwork = await fetch(details.coverUrl).then((res) =>
            res.arrayBuffer()
          );
          await safeWriteFile(
            [albumPath, `${album.name}.jpg`],
            Buffer.from(artwork)
          );
          console.log(`Downloaded artwork of ${album.name}`);
        }

        let i = 1;
        for (const summary of details.songs) {
          try {
            const { data } = await api.songDetails(summary.cid);
            const song = {
              ...data,
              name: escapeFileName(data.name),
              originalName: data.name,
            };
            const fileName = escapeFileName(
              albumPath,
              `${i.toString(10).padStart(2, "0")}_${song.name}.flac`
            );

            let command: ffmpeg.FfmpegCommand;
            let exists = false;
            if (!(await safeIsExists(fileName)) || option.force) {
              console.log(`Downloading: ${summary.name} of ${album.name}`);
              command = ffmpeg(song.sourceUrl).format("flac");
              await setTimeout(3000);
            } else if (option["meta-only"]) {
              command = ffmpeg(fileName)
                .audioCodec("copy")
                .on("end", () => {
                  (async () => {
                    if (exists) {
                      await fs.unlink(fileName);
                      await fs.rename(path.join(".tmp", fileName), fileName);
                    }
                  })();
                });
              exists = true;
              await setTimeout(1000);
            } else {
              console.log(`Skipping: ${summary.name} of ${album.name}`);
              continue;
            }

            addMetadata(command, {
              title: song.originalName,
              albumArtists: album.artistes.join("/"),
              artists: song.artists.join("/"),
              album: album.originalName,
              genre: "soundtrack",
              artworkPath: `${albumPath}/${album.name}.jpg`,
              track: `${i}/${details.songs.length}`,
              copyright: "hypergryph",
            })
              .save((exists ? ".tmp/" : "") + fileName)
              .on("start", (e) => console.log(e))
              .on("error", (e) => {
                console.error(song.originalName, e);
                onError();
              })
              .on("end", () => {
                console.log(
                  `Done ${summary.name} of ${album.name}(${i}/${details.songs.length})`
                );
              });
          } catch (error) {
            await onError();
            console.log(error);
          } finally {
            ++i;
          }
        }
      })
    )
  );

  await fs.rm(".tmp", { recursive: true }).catch(() => {});
})();

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

function addMetadata(command: ffmpeg.FfmpegCommand, metaData: Metadata) {
  return command
    .addInput(metaData.artworkPath)
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
