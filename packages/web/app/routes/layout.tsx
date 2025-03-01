import { Outlet, useLoaderData } from "react-router";
import * as styles from "./layout.css";
import { trpcClient } from "@/src/trpc/trpcClient";
import Albums from "@/src/pages/Albums/Albums";

export async function loader() {
  const { albums } = await trpcClient.albums.list.query();

  return albums;
}

export default function Layout() {
  const albums = useLoaderData<typeof loader>();
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Albums albums={albums} />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
