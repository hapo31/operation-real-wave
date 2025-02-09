import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "core/trpc";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8080",
    }),
  ],
});
