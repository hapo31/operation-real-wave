import { Hono } from "npm:hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve(app.fetch);
