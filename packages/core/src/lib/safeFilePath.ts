import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

export class SafeFilePath {
  public static basePath = "albums";

  private _fileName: string;

  constructor(...paths: string[]) {
    this._fileName = this.escape(...paths);
  }

  set fileName(v: string) {
    this._fileName = this.escape(v);
  }

  toString() {
    return this._fileName;
  }

  joinLeft(...path: string[]) {
    return new SafeFilePath(...path, this._fileName);
  }

  join(...path: string[]) {
    return new SafeFilePath(this._fileName, ...path);
  }

  dirname() {
    const parsed = path.parse(this._fileName);
    const dir = parsed.ext === "" ? this._fileName : parsed.dir;
    return new SafeFilePath(dir);
  }

  basename() {
    const parsed = path.parse(this._fileName);
    return parsed.base;
  }

  private escape(...paths: string[]) {
    return path.join(
      ...paths.map((path) =>
        path
          .replace(/[\\?%*:|"<>\s]/g, "_")
          .replace(/\.+$/, "")
          .trim()
      ),
    );
  }
}

export async function safeIsExists(file: SafeFilePath): Promise<boolean> {
  return await Deno
    .stat(file.toString())
    .then(() => true)
    .catch(() => false);
}

export async function safeMkdir(file: SafeFilePath): Promise<boolean> {
  const parsed = path.parse(file.toString());
  const dir = parsed.ext === "" ? file.toString() : parsed.dir;
  return await Deno
    .mkdir(dir, { recursive: true })
    .then(() => true)
    .catch(() => false);
}

export async function safeWriteFile(file: SafeFilePath, buffer: ArrayBuffer) {
  return await Deno
    .writeFile(file.toString(), new Uint8Array(buffer))
    .then(() => true)
    .catch(() => false);
}

export async function safeDeleteFile(file: SafeFilePath) {
  return await Deno
    .remove(file.toString())
    .then(() => true)
    .catch(() => false);
}
