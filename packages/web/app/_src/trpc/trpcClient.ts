import {
  // defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "core/trpc";

export const trpc = createTRPCReact<AppRouter>();

export function makeQueryClient() {
  return new QueryClient(
    {
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
          refetchOnMount: true,
        },
        // dehydrate: {
        //   shouldDehydrateQuery: (query) =>
        //     defaultShouldDehydrateQuery(query) ||
        //     query.state.status === "pending",
        // },
      },
    },
  );
}
