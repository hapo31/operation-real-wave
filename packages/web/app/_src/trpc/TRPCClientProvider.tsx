import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient, trpc, trpcClient } from "./trpcClient";

type Props = {
  children: ReactNode;
};

export default function TRPCClientProvider({ children }: Props) {
  const queryClient = getQueryClient();
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
