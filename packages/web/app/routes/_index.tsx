import Albums from "@/src/pages/Albums/Albums.jsx";
import { trpc } from "@/src/trpc/trpcClient.js";

export default function IndexPage() {
  const [{ albums }] = trpc.albums.list.useSuspenseQuery();

  return <Albums albums={albums} />;
}
