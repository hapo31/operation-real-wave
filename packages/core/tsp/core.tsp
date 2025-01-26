import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

/**
 * MSR Soundtrack audio management website's schema
 *
 */
@service({
  title: "Operation real wave API",
})
@info({
  version: "0.0.1",
})
namespace core;

enum FileStatus {
  NOT_EXISTS,
  BROKEN,
  EXISTS,
}

model Album {
  cid: string;
  name: string;
  songs: Song[];
  status: FileStatus;
  coverPath: string;
}

model AlbumSummary {
  cid: string;
  name: string;
  artistes: string[];
  status: FileStatus;
  coverPath: string;
}

model Song {
  cid: string;
  name: string;
  artistes: string[];
  status: FileStatus;
  filePath: string;
}

model AlbumListResponse {
  albums: AlbumSummary[];
}

model FetchAlbumResponse {
  queuedSongs: Song[];
}

model AlbumSongListResponse {
  album: Album;
}

model SongStatusResponse {
  song: Song;
}

model FetchSongResponse {
  song: Song;
}

/**
 * OK
 */
model getAlbums200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: AlbumListResponse;
}

/**
 * OK
 */
model deleteAlbum200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: AlbumSongListResponse;
}

/**
 * OK
 */
model getAlbumSongs200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: AlbumSongListResponse;
}

/**
 * OK
 */
model fetchAlbumSongs200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: FetchAlbumResponse;
}

/**
 * OK
 */
model deleteSong200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: SongStatusResponse;
}

/**
 * OK
 */
model getSongStatus200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: SongStatusResponse;
}

/**
 * OK
 */
model fetchSong200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: FetchSongResponse;
}

@tag("album")
@route("/albums")
@get
@summary("アルバムの一覧を取得")
op getAlbums(): getAlbums200ApplicationJsonResponse;

@tag("album")
@route("/album/{cid}")
@delete
@summary("指定したアルバムをファイルシステム上から削除する")
op deleteAlbum(
  /**
   * アルバムの cid
   */
  @path cid: string,
): deleteAlbum200ApplicationJsonResponse;

@tag("album")
@route("/album/{cid}")
@get
@summary("指定したアルバムの楽曲一覧を取得")
op getAlbumSongs(
  /**
   * アルバムの cid
   */
  @path cid: string,
): getAlbumSongs200ApplicationJsonResponse;

@tag("album")
@route("/album/{cid}")
@post
@summary("指定したアルバムの楽曲すべてのダウンロードを開始する")
op fetchAlbumSongs(
  /**
   * アルバムの cid
   */
  @path cid: string,
): fetchAlbumSongs200ApplicationJsonResponse;

@tag("songs")
@route("/song/{cid}")
@delete
@summary("指定した楽曲をファイルシステム上から削除する")
op deleteSong(
  /**
   * 楽曲の cid
   */
  @path cid: string,
): deleteSong200ApplicationJsonResponse;

@tag("songs")
@route("/song/{cid}")
@get
@summary("指定した楽曲の状態を取得")
op getSongStatus(
  /**
   * 楽曲の cid
   */
  @path cid: string,
): getSongStatus200ApplicationJsonResponse;

@tag("songs")
@route("/song/{cid}")
@post
@summary("指定した楽曲のダウンロードを開始する")
op fetchSong(
  /**
   * 楽曲の cid
   */
  @path cid: string,
): fetchSong200ApplicationJsonResponse;
