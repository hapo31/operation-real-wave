import { useLoaderData } from "@remix-run/react";

import fs from "fs/promises";

export async function loader() {
  const dir = await fs.readdir("./src");

  return { message: dir };
}

export async function action() {}

export default function Hoge() {
  const data = useLoaderData<typeof loader>();

  return (
    <ul>
      {data.message.map((s, index) => (
        <li key={index}>{s}</li>
      ))}
    </ul>
  );
}
