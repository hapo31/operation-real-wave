import { Album } from "../generated-core/models/Album.ts";
import IFile from "../lib/IFile.ts";
import {
  safeDeleteFile,
  SafeFilePath,
  safeIsExists,
  safeMkdir,
  safeWriteFile,
} from "../lib/safeFilePath.ts";

export default class AlbumFile implements IFile {
  private _filePath: SafeFilePath;
  constructor(private basePath: string, model: Pick<Album, "coverPath">) {
    this._filePath = new SafeFilePath(
      this.basePath,
      model.coverPath,
    );
  }

  get filePath(): SafeFilePath {
    return this._filePath;
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
