import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";

import { SafeFilePath } from "./safeFilePath.ts";

Deno.test("normal", () => {
  const file = new SafeFilePath("a", "b", "c");
  assertEquals(file.toString(), "a/b/c");
});

Deno.test("escape", () => {
  const file = new SafeFilePath("a*:", "b?", "c ");
  assertEquals(file.toString(), "a__/b_/c_");
});

Deno.test("join", () => {
  const file = new SafeFilePath("a", "b", "c");
  assertEquals(file.join("d", "e").toString(), "a/b/c/d/e");
});

Deno.test("join(escape)", () => {
  const file = new SafeFilePath("a", "b", "c");
  assertEquals(file.join("d?", "e ").toString(), "a/b/c/d_/e_");
});

Deno.test("joinLeft", () => {
  const file = new SafeFilePath("a", "b", "c");
  assertEquals(file.joinLeft("d", "e").toString(), "d/e/a/b/c");
});

Deno.test("joinLeft(escape)", () => {
  const file = new SafeFilePath("a", "b", "c");
  assertEquals(file.joinLeft("d?", "e?? ").toString(), "d_/e___/a/b/c");
});
