export const apiFetch = (...args: Parameters<typeof fetch>) => {
  const [path, ...rest] = args;
  const host = process.env.API_URL!;
  return fetch(host + path, ...rest).then((res) => res.json());
};
