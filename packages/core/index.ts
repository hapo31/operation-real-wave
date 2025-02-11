import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "./src/trpc/init.ts"

import albumsRoute from "./src/albums/albumsRoute.ts";
import songRoute from "./src/albums/songRoute.ts";

export const appRouter = router({
  albums: albumsRoute,
  song: songRoute
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(8000);
