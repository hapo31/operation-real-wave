import { fetchAlbumArtWork } from "../fetcher.ts";
import { SafeFilePath, safeIsExists, safeMkdir } from "../lib/safeFilePath.ts";
import Album from "../model/Album.ts";
import { FileStatus } from "../type.ts";

export default class AlbumFileService {
  async artworkStatus(album: Pick<Album, "cid" | "name">): Promise<FileStatus> {
    return await safeIsExists(this.getAlbumPath(album)) ? FileStatus.EXISTS : FileStatus.NOT_EXISTS;
  }

  async fetchCover(album: Pick<Album, "cid" | "name" | "coverUrl">): Promise<void> {
    const cover = await fetchAlbumArtWork(album);
    const filePath = this.getAlbumPath(album).joinLeft(SafeFilePath.basePath);

    // ディレクトリを作ってから保存
    await safeMkdir(filePath);
    await Deno.writeFile(filePath.join("cover.jpg").toString(), new Uint8Array(cover));
  }

  getAlbumPath(album: Pick<Album, "cid" | "name">): SafeFilePath {
    return new SafeFilePath(
      `${album.cid}_${album.name}`,
    );
  }
}
