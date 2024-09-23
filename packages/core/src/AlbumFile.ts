import { Album } from "./generated-core/models/Album.ts";
import IFile from "./lib/IFile.ts";
import {
  safeDeleteFile,
  SafeFilePath,
  safeIsExists,
  safeMkdir,
  safeWriteFile,
} from "./safeFilePath.ts";

export default class AlbumFile implements IFile {
  private filePath: SafeFilePath;
  constructor(private basePath: string, model: Album) {
    this.filePath = new SafeFilePath(
      this.basePath,
      model.coverPath,
    );
  }
  async save(arrayBuffer: ArrayBuffer): Promise<void> {
    await safeMkdir(this.filePath);
    await safeWriteFile(this.filePath, arrayBuffer);
  }
  async delete(): Promise<void> {
    await safeDeleteFile(this.filePath);
  }
  async exists(): Promise<boolean> {
    return await safeIsExists(this.filePath);
  }
}
