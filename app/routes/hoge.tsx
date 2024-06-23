import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const dir = await Array.fromAsync(Deno.readDir("./src"));
  return { message: dir };
}

export async function action() {}

export default function Hoge() {
  const data = useLoaderData<typeof loader>();

  return (
    <ul>
      {data.message.map((s, index) => <li key={index}>{s.name}</li>)}
    </ul>
  );
}
