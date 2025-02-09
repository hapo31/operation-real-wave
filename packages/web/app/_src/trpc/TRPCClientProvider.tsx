import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpcClient";
import { httpBatchLink } from "@trpc/client";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:8000",
    }),
  ],
});

export default function TRPCClientProvider({ children }: Props) {
  return (
    <trpc.Provider trpcClient={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
