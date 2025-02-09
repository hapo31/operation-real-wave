import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "./src/trpc.ts"

import * as albums from "./src/albums/index.ts";

const appRouter = router({
  albums
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter
});


Deno.serve(server);