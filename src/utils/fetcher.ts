const fetcher: typeof fetch = (input, init) => {
  return fetch(`${process.env["API_BASE_URL"]}/${input}`, init);
};

export default fetcher;
