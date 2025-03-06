import { router } from "./src/trpc/init.ts"

import albumsRoute from "./src/routes/albums.ts";
import songRoute from "./src/routes/song.ts";
import * as trpcExpress from "@trpc/server/adapters/express";
import express, { type Request, type Response } from "express";
import { playRoute } from "./src/routes/play.ts";

const app = express();


export const appRouter = router({
  albums: albumsRoute,
  song: songRoute
});

export type AppRouter = typeof appRouter;

app.use("/api", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.get("/play/:albumCid/:songCid.flac", async (req: Request, res: Response) => {
  await playRoute(req.params, res);
});

app.listen(8000);
