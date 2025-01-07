export const apiFetch = (...args: Parameters<typeof fetch>) => {
  const [path, ...rest] = args;
  const host = process.env.API_URL!;
  return fetch(host + path, ...rest).then(async (res) => {
    if (!res.ok) {
      throw await res.json();
    }
    return await res.json();
  });
};
