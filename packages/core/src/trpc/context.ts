export async function createContext() {
  // empty context
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
