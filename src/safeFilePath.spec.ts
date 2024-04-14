import { describe, test, it, expect, vi } from "vitest";

import {
  safeIsExists,
  safeMkdir,
  safeWriteFile,
  SafeFilePath,
} from "./safeFilePath.js";

describe("SafeFilePath", () => {
  test("normal", async () => {
    const file = new SafeFilePath("a", "b", "c");
    expect(file.toString()).toBe("a/b/c");
  });

  test("escape", async () => {
    const file = new SafeFilePath("a*:", "b?", "c ");
    expect(file.toString()).toBe("a__/b_/c_");
  });

  test("join", () => {
    const file = new SafeFilePath("a", "b", "c");
    expect(file.join("d", "e").toString()).toBe("a/b/c/d/e");
  });

  test("join(escape)", () => {
    const file = new SafeFilePath("a", "b", "c");
    expect(file.join("d?", "e ").toString()).toBe("a/b/c/d_/e_");
  });

  test("joinLeft", () => {
    const file = new SafeFilePath("a", "b", "c");
    expect(file.joinLeft("d", "e").toString()).toBe("d/e/a/b/c");
  });

  test("joinLeft(escape)", () => {
    const file = new SafeFilePath("a", "b", "c");
    expect(file.joinLeft("d?", "e?? ").toString()).toBe("d_/e___/a/b/c");
  });
});
