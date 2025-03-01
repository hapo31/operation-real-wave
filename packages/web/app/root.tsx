import TRPCClientProvider from "@/src/trpc/TRPCClientProvider";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./root.css";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <meta charSet="UTF-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <TRPCClientProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </TRPCClientProvider>
      </body>
    </html>
  );
}
