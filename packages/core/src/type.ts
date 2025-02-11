import { z } from "zod";

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

export const FileStatus = {
  NOT_EXISTS: "NOT_EXISTS",
  BROKEN: "BROKEN",
  EXISTS: "EXISTS",
} as const;

export type FileStatus = keyof typeof FileStatus;

export type AlbumStatus = {
  cid: string;
  status: FileStatus;
};
