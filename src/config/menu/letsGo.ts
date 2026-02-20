type Params = Record<string, string | number | boolean>;
export const goPage = (key: string, params?: Params): string => {
  let uri = key;
  if (params) {
    uri += queryString(params);
  }
  return uri || "";
};

export const queryString = (params: Params): string => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return query ? `?${query}` : "";
};
