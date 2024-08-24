import { pLimit } from "https://deno.land/x/p_limit@v1.0.0/mod.ts";
import { AlbumEntity, fetchSongFile, SafeFileNameWith } from "../fetcher.ts";
import { SafeFilePath, safeIsExists } from "../safeFilePath.ts";
import { setSongStatuses } from "../songStatus.ts";
import { Song } from "../type.ts";

declare const self: Worker;

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

  await Promise.all(data.targetAlbums.map((album) => async () => {
    setSongStatuses(album.songs.map((song) => song.cid), "DOWNLOADING");

    await Promise.all(album.songs.map((song, index, self) =>
      limit(async () => {
        const songWithFileName: SafeFileNameWith<Song> = {
          ...song,
          fileName: new SafeFilePath(`${album.cid}_${album.name}`, album.name),
          originalName: album.name,
        };
        let retry = 0;
        while (retry < 3) {
          try {
            await fetchSongFile(
              songWithFileName,
              album,
              `${index + 1}/${self.length}`,
            );
          } catch (e) {
            console.error(e);
            if (retry > 3) {
              setSongStatuses([song.cid], "ERROR");
              return;
            }
            ++retry;
            console.log(
              `${songWithFileName.fileName} has error on fetching, ${retry} times`,
            );
            await wait(retry * retry * 1000);
          }
        }

        if (await safeIsExists(songWithFileName.fileName)) {
          setSongStatuses([song.cid], "EXIST");
        }
      })
    ));
  }));
});

function isEventPayload(data: unknown): data is AlbumFetchEventPayload {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    data.type === "fetchAlbums"
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
