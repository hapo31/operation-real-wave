import Albums from "@/src/pages/Albums/Albums.jsx";
import { serverSideTrpc } from "@/src/trpc/trpcServer";
import { useLoaderData } from "react-router";

async function loader() {
  // FIXME:
  // Only URLs with a scheme in: file and data are supported by the default ESM loader. Received protocol 'https:'
  //   at getSource (node:internal/modules/esm/load:51:11)
  //   at defaultLoad (node:internal/modules/esm/load:114:40)
  //   at ModuleLoader.load (node:internal/modules/esm/loader:670:12)
  //   at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:483:43)
  //   at ModuleLoader.#createModuleJob (node:internal/modules/esm/loader:507:36)
  //   at ModuleLoader.#getJobFromResolveResult (node:internal/modules/esm/loader:275:34)
  //   at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:243:41)
  //   at onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:546:25
  const albums = await serverSideTrpc.albums.list();

  return { albums };
}

export default function IndexPage() {
  const albums = useLoaderData<typeof loader>();

  return <Albums albums={[]} />;
}
