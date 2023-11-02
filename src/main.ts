import pLimit from "p-limit";
import * as api from "./api.js";
import * as fs from "fs/promises";
import { setTimeout } from "timers/promises";
import ffmpeg from "fluent-ffmpeg";
import path from "path";

const basePath = "dist";

(async function main() {
  const { data: albums } = await api.albums();
  const limit = pLimit(3);

  await Promise.all(
    albums.map((album) =>
      limit(async () => {
        const { data: details } = await api.albumDetails(album.cid);
        const albumPath = path
          .join(basePath, album.name.replace(/[/\\?%*:|"<>\s]/g, "_"))
          .trim();
        try {
          await fs.mkdir(albumPath, { recursive: true });
          await fs.mkdir(path.join(".tmp", albumPath), { recursive: true });
        } catch {}

        if (
          await fs
            .stat(`${albumPath}/${album.name}.jpg`)
            .then(() => false)
            .catch(() => true)
        ) {
          const artwork = await fetch(details.coverUrl).then((res) =>
            res.arrayBuffer()
          );
          await fs.writeFile(
            path.join(albumPath, `${album.name}.jpg`),
            Buffer.from(artwork)
          );
        }

        let i = 1;
        for (const summary of details.songs) {
          try {
            const { data: song } = await api.songDetails(summary.cid);
            const fileName = path.join(
              albumPath,
              `${i.toString(10).padStart(2, "0")}_${song.name.replace(
                /[/\\?%*:|"<>\s]/g,
                "_"
              )}.flac`
            );

            let command: ffmpeg.FfmpegCommand;
            let exists = false;
            if (
              await fs
                .stat(fileName)
                .then(() => true)
                .catch(() => false)
            ) {
              console.log(
                `File exists, only update metadata: ${summary.name} of ${album.name}`
              );
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
              console.log(`Downloading: ${summary.name} of ${album.name}`);
              command = ffmpeg(song.sourceUrl).format("flac");
              await setTimeout(3000);
            }

            addMetadata(command, {
              title: song.name,
              albumArtists: album.artistes.join("/"),
              artists: song.artists.join("/"),
              album: album.name,
              genre: "soundtrack",
              artworkPath: `${albumPath}/${album.name}.jpg`,
              track: `${i}/${details.songs.length}`,
              copyright: "hypergryph",
            })
              .save((exists ? ".tmp/" : "") + fileName)
              .on("start", (e) => console.log(e));
          } catch (error) {
            console.log(error);
          } finally {
            console.log(
              `Done ${summary.name} of ${album.name}(${i}/${details.songs.length})`
            );
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
