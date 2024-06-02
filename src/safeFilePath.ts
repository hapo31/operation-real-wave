import { path } from "@/deps";

export class SafeFilePath {
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
  const dir = path.dirname(file.toString());
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
