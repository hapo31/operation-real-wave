import { z } from "npm:@hono/zod-openapi";

export const AlbumSchema = z.object({
  cid: z.string(),
  name: z.string(),
  coverUrl: z.string(),
  artistes: z.array(z.string()),
});

export const SongSummarySchema = z.object({
  cid: z.string(),
  name: z.string(),
  artistes: z.array(z.string()),
});

export const AlbumDetailsSchema = z.object({
  cid: z.string(),
  name: z.string(),
  intro: z.string(),
  belong: z.string(),
  coverUrl: z.string(),
  coverDeUrl: z.string(),
  songs: z.array(SongSummarySchema),
});

export const SongSchema = z.object({
  cid: z.string(),
  name: z.string(),
  albumCid: z.string(),
  sourceUrl: z.string(),
  lyricUrl: z.string().nullable(),
  mvUrl: z.string().nullable(),
  mvCoverUrl: z.string().nullable(),
  artists: z.array(z.string()),
});

export const AlbumsAPIResponseSchema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.array(AlbumSchema),
});

export const AlbumDetailsAPIResponseSchema = z.object({
  code: z.number(),
  msg: z.string(),
  data: AlbumDetailsSchema,
});

export const SongDetailsAPIResponseSchema = z.object({
  code: z.number(),
  msg: z.string(),
  data: SongSchema,
});

export type Album = z.infer<typeof AlbumSchema>;
export type SongSummary = z.infer<typeof SongSummarySchema>;
export type AlbumDetails = z.infer<typeof AlbumDetailsSchema>;
export type Song = z.infer<typeof SongSchema>;
export type AlbumsAPIResponse = z.infer<typeof AlbumsAPIResponseSchema>;
export type AlbumDetailsAPIResponse = z.infer<
  typeof AlbumDetailsAPIResponseSchema
>;
export type SongDetailsAPIResponse = z.infer<
  typeof SongDetailsAPIResponseSchema
>;
