import path from "path";
import fs from "fs/promises";

export class SafeFilePath {
  private fileName: string;

  constructor(...paths: string[]) {
    this.fileName = path.join(
      ...paths.map((path) =>
        path
          .replace(/[\\?%*:|"<>\s]/g, "_")
          .replace(/\.+$/, "")
          .trim()
      )
    );
  }

  toString() {
    return this.fileName;
  }

  joinLeft(...path: string[]) {
    return new SafeFilePath(...path, this.fileName);
  }

  join(...path: string[]) {
    return new SafeFilePath(this.fileName, ...path);
  }
}

export async function safeIsExists(file: SafeFilePath): Promise<boolean> {
  return fs
    .stat(file.toString())
    .then(() => true)
    .catch(() => false);
}

export async function safeMkdir(file: SafeFilePath): Promise<boolean> {
  const dir = path.dirname(file.toString());
  return fs
    .mkdir(dir, { recursive: true })
    .then(() => true)
    .catch(() => false);
}

export async function safeWriteFile(file: SafeFilePath, buffer: Buffer) {
  return fs
    .writeFile(file.toString(), buffer)
    .then(() => true)
    .catch(() => false);
}
