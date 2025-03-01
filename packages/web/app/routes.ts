import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/_index.tsx"),
    route("album/details/:cid", "routes/album.details.$cid.tsx"),
  ]),
] satisfies RouteConfig;
