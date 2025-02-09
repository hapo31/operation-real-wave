import { makeQueryClient } from "@/src/trpc/trpcClient";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { appRouter } from "core/trpc";
import { createCallerFactory } from "core/trpc/init";
import { cache } from "react";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)({});

export const { trpc: serverSideTrpc, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(
  caller,
  getQueryClient,
);
