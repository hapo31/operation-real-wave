import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

/**
 * MSR original soundtrack website's schema
 * https://monster-siren.hypergryph.com
 *
 */
@service({
  title: "(c) MONSTER SIREN RECORD",
})
@info({
  version: "0.0.1",
})
namespace msr;

model MsrAlbumSummary {
  cid: string;
  name: string;
  coverUrl: string;
  coverDeUrl: string;
  artistes: string[];
}

model MsrSongSummary {
  cid: string;
  name: string;
  artistes: string[];
}

model MsrAlbumDetails {
  cid: string;
  name: string;
  intro: string;
  belong: string;
  coverUrl: string;
  coverDeUrl: string;
  songs: MsrSongSummary[];
}

model MsrAlbumData {
  cid: string;
  name: string;
  intro: string;
  belong: string;
  coverUrl: string;
  coverDeUrl: string;
  artistes: string[];
}

model MsrSong {
  cid: string;
  name: string;
  albumCid: string;
  sourceUrl: string;
  lyricUrl: string;
  mvUrl: string | null;
  mvCoverUrl: string | null;
  artists: string[];
}

model MsrAlbumsResponse {
  code: integer;
  msg: string;
  data: MsrAlbumSummary[];
}

model MsrAlbumDetailResponse {
  code: integer;
  msg: string;
  data: MsrAlbumDetails;
}

model MsrAlbumDataResponse {
  code: integer;
  msg: string;
  data: MsrAlbumData;
}

model MsrSongDetailsResponse {
  code: integer;
  msg: string;
  data: MsrSong;
}

/**
 * OK
 */
model MsrGetAlbums200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: MsrAlbumsResponse;
}

/**
 * OK
 */
model MsrGetAlbumSongs200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: MsrAlbumDetailResponse;
}

/**
 * OK
 */
model MsrGetAlbumDetails200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: MsrAlbumDetailResponse;
}

/**
 * OK
 */
model MsrGetSongDetails200ApplicationJsonResponse {
  @statusCode statusCode: 200;
  @bodyRoot body: MsrSongDetailsResponse;
}

@tag("album")
@route("/albums")
@get
@summary("リリース済みアルバムの一覧を取得")
op getAlbums(): MsrGetAlbums200ApplicationJsonResponse;

@tag("album")
@route("/album/{cid}/detail")
@get
@summary("指定したアルバムの収録楽曲一覧を取得")
op getAlbumSongs(
  /**
   * アルバムの cid
   */
  @path cid: string,
): MsrGetAlbumSongs200ApplicationJsonResponse;

@tag("album")
@route("/album/{cid}/data")
@get
@summary("指定したアルバムの楽曲を除いた詳細データを取得")
op getAlbumDetails(
  /**
   * アルバムの cid
   */
  @path cid: string,
): MsrGetAlbumDetails200ApplicationJsonResponse;

@tag("songs")
@route("/song/{cid}")
@get
@summary("指定した楽曲の詳細を取得")
op getSongDetails(
  /**
   * 楽曲の cid
   */
  @path cid: string,
): MsrGetSongDetails200ApplicationJsonResponse;
