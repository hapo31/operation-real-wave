import { index, route, type RouteConfig } from "@react-router/dev/routes";

const routes = [
  index("routes/_index.tsx"),
  route("album/details/:cid", "routes/album.details.$cid.tsx"),
  route("albums", "routes/albums.tsx"),
] satisfies RouteConfig;

export default routes;
