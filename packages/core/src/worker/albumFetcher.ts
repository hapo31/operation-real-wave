import { pLimit } from "https://deno.land/x/p_limit@v1.0.0/mod.ts";
import { fetchSongFile, SafeFileNameWith } from "../fetcher.ts";
import { AlbumDetails, Song } from "../type.ts";
import { SafeFilePath, safeIsExists } from "../safeFilePath.ts";
import { setSongStatuses } from "../songStatus.ts";

declare const self: Worker;

export type AlbumEntity = Omit<AlbumDetails, "songs"> & {
  songs: Song[];
};

export type AlbumFetchEventPayload = {
  type: "fetchAlbum";
  targetAlbums: AlbumEntity[];
};

self.addEventListener("message", async (event) => {
  const { data } = event;
  if (!isEventPayload(data)) {
    console.error("Invalid event data, I'm albumFetcher.ts", data);
    self.terminate();
    return;
  }

  const limit = pLimit(5);

  await Promise.all(data.targetAlbums.map((song) =>
    limit(async () => {
      const songWithFileName: SafeFileNameWith<Song> = {
        ...song,
        fileName: new SafeFilePath(song.name),
        originalName: song.name,
      };
      setSongStatuses([song.albumCid], "DOWNLOADING");
      let retry = 0;
      while (retry < 3) {
        try {
          await fetchSongFile(songWithFileName);
        } catch (e) {
          console.error(e);
          if (retry > 3) {
            setSongStatuses([song.albumCid], "ERROR");
            return;
          }
          ++retry;
          console.log(
            `${songWithFileName.fileName} has error on fetching, ${retry} times`,
          );
          await wait(retry * retry * 1000);
        }
      }
      if (await safeIsExists(songWithFileName.fileName)) {}
      setSongStatuses([song.albumCid], "EXIST");
    })
  ));
});

function isEventPayload(data: unknown): data is AlbumFetchEventPayload {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    data.type === "fetchAlbums"
  );
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
