import { albumApi } from "../api.ts";
import AlbumModel from "../model/AlbumModel.ts";
import { publicProcedure } from "../trpc.ts";

export const list = publicProcedure.query(async () => {
  const { data } = await albumApi().getAlbums();

  return {
    albums: await Promise.all(
      data
        .map((album) => new AlbumModel(album))
        .map(async (album) => ({
          ...album,
          coverPath: await album.coverPath,
          status: await album.fileStatus(),
        })),
    ),
  };
});
