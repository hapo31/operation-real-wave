import * as fs from "fs/promises";
import path from "path";

export async function enumurateAlbumListFromDir(dir: string) {
  const albums = await fs.readdir(dir, { withFileTypes: true });

  return albums.map((file) => ({ name: file.name }));
}

export function escapeFileName(...paths: string[]): string;
export function escapeFileName(paths: string): string;
export function escapeFileName(...paths: string[]) {
  return path.join(
    ...paths.map((path) =>
      path
        .replace(/[\\?%*:|"<>\s]/g, "_")
        .replace(/\.+$/, "")
        .trim()
    )
  );
}

export async function safeMkdir(...paths: string[]) {
  try {
    fs.mkdir(escapeFileName(...paths), { recursive: true });
    return true;
  } catch {
    return false;
  }
}

export async function safeWriteFile(paths: string[], buffer: Buffer) {
  fs.writeFile(escapeFileName(...paths), buffer);
}

export async function safeIsExists(...paths: string[]) {
  return fs
    .stat(escapeFileName(...paths))
    .then(() => true)
    .catch(() => false);
}
