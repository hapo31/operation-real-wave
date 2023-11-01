import pLimit from "p-limit";
import * as api from "./api.js";
import * as fs from "fs/promises";
import { setTimeout } from "timers/promises";
import ffmpeg from "fluent-ffmpeg";

const basePath = "dist";

(async function main() {
  const { data: albums } = await api.albums();
  const limit = pLimit(3);

  await Promise.all(
    albums.map((album) =>
      limit(async () => {
        const { data: details } = await api.albumDetails(album.cid);
        const albumPath = `${basePath}/${album.name}`;
        try {
          await fs.mkdir(albumPath, { recursive: true });
        } catch {}

        const artwork = await fetch(details.coverUrl).then((res) =>
          res.arrayBuffer()
        );
        await fs.writeFile(
          `${albumPath}/${album.name}.jpg`,
          Buffer.from(artwork)
        );

        let i = 1;
        for (const summary of details.songs) {
          try {
            const { data: song } = await api.songDetails(summary.cid);
            const fileName = `${albumPath}/${i
              .toString(10)
              .padStart(2, "0")}_${song.name.replace(
              /[/\\?%*:|"<>\s]/g,
              "_"
            )}.flac`;

            if (
              await fs
                .stat(fileName)
                .then(() => true)
                .catch(() => false)
            ) {
              console.log(`Skipping ${fileName}`);
              continue;
            }

            ffmpeg(song.sourceUrl)
              .format("flac")
              .addInput(`${albumPath}/${album.name}.jpg`)
              .outputOptions(
                `-map`,
                `0:a`,
                `-map`,
                `1:v`,
                `-disposition:1`,
                `attached_pic`
              )
              .outputOptions("-metadata", `title=${song.name}`)
              .outputOptions(
                "-metadata",
                `album_artist=${album.artistes.join(", ")}`
              )
              .outputOptions("-metadata", `artist=${song.artists.join(", ")}`)
              .outputOptions("-metadata", `track=${i}/${details.songs.length}`)
              .outputOptions("-metadata", `album=${album.name}`)
              .outputOptions("-metadata", `copyright=hypergryph`)
              .save(fileName);
          } catch (error) {
            console.log(error);
          } finally {
            console.log(
              `Done ${summary.name} of ${album.name}(${i}/${details.songs.length})`
            );
            await setTimeout(3000);
            ++i;
          }
        }
      })
    )
  );
})();
