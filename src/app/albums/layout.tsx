import { fetchAllAlbums } from "@api/albums/route.js";
import { Flex } from "@yamada-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function AlbumsListLayout({ children }: Props) {
  return <Flex direction="column">{children}</Flex>;
}
