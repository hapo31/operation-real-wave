import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCQueryUtils, createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "core/trpc";

export const trpc = createTRPCReact<AppRouter>();

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return `http://localhost:3000/api`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`;
    if (process.env.VITE_API_URL) {
      return `https://${process.env.VITE_API_URL}/api`;
    }
    return "http://localhost:8000";
  })();
  return base;
}

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});

let clientQueryClientSingleton: QueryClient;
export function getQueryClient() {
  if (typeof window === "undefined") {
    // サーバーサイドでは常に makeQueryClient する
    return makeQueryClient();
  }
  // クライアントサイドではキャッシュされた queryClient を取得する
  return (clientQueryClientSingleton ??= makeQueryClient());
}

export const trpcUtil = createTRPCQueryUtils({
  queryClient: getQueryClient(),
  client: trpcClient,
});

export function makeQueryClient() {
  return new QueryClient(
    {
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
          refetchOnMount: true,
        },
        dehydrate: {
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending",
        },
      },
    },
  );
}
