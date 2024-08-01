import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";
import { SafeFileNameWith } from "./fetcher.ts";

import type { Album } from "./type.ts";

const db = new DB();

function makePlaceHolders(records: object[]) {
  return records.map((record) =>
    `(${Object.keys(record).map(() => "?").join(", ")})`
  ).join(",");
}

export function insert<T extends object>(
  table: string,
  records: T[],
  upsert = false,
) {
  const columns = Object.keys(records[0]);
  const placeholders = makePlaceHolders(records);
  const sql = `${upsert ? "REPLACE" : "INSERT"} INTO ${table} (${
    columns.join(", ")
  }) VALUES ${placeholders}`;

  const rows = db.query(
    sql,
    records.flatMap((record) => Object.values(record)),
  );

  return rows;
}

export function get<T extends Record<string | number | symbol, never>>(
  table: string,
  limit = -1,
) {
  const limitSt = limit === -1 ? "" : `LIMIT ${limit}`;
  return db.queryEntries<T>(`SELECT * FROM ? ${limitSt}`, [table]);
}

export function collectionAlbums(albums: SafeFileNameWith<Album>[]) {
  const records = albums.map((album) => ({
    albumId: uuid(),
    albumCid: album.cid,
    name: album.name,
    coverUrl: album.coverUrl,
    artistes: album.artistes.join(", "),
  }));

  insert("albums", records);
}
